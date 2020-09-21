const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const admin = require('firebase-admin');
const { PubSub } = require('@google-cloud/pubsub');
const request = require('request')
const fs = require('fs')
const os = require('os')
const path = require('path')

admin.initializeApp();
const db = admin.firestore();
var storageRef = admin.storage();

const baseUrl = 'https://bokunoheroacademia.fandom.com/wiki';
const urlBaseCharacters = () => `${baseUrl}/List_of_Characters`;
const urlBaseCharacter = (id) => `${baseUrl}/${id}`;



exports.getCharacters = functions
  .runWith({ memory: '1GB', timeoutSeconds: 120 })
  .https.onRequest(async (request, response) => {

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(urlBaseCharacters());

    const listHtml = await page.evaluate(() => {
      const list = [];
      document.querySelectorAll('.wikia-gallery-item').forEach(e => {

        list.push(e.innerHTML);
      })
      return list;
    })


    const idsList = [];

    listHtml.forEach(e => {
      const $ = cheerio.load(e);

      const image = $('img').attr('data-src');
      const id = $('a').attr('href');
      const replaceId = id.replace('/wiki/', '')

      const referenceCode = `${replaceId}.jpg`;
      const pathTmp = path.join(os.tmpdir(), referenceCode)

      download(image, pathTmp).then(() => {
        storageRef.bucket('my-hero-academia-api').upload(pathTmp), {
          destination: referenceCode
        }
        return;
      }).catch(err => {
        console.error(err);
      });


      const character = {
        id: replaceId,
        images: [referenceCode]
      };

      idsList.push(character.id);
      const docRef = db.collection('characters').doc(character.id);

      docRef.set(character);
    })

    // const snapshot = await db.collection('characters').get();

    // const characters = [];
    // snapshot.forEach(e => {
    //   characters.push(e.data());
    // })

    const pubSub = new PubSub({
      projectId: process.env.GCLOUD_PROJECT
    })

    const publishPromises = idsList.map(id => {
      return pubSub.topic(fetchCharactersTopic).publishJSON({ id });
    })

    await Promise.all(publishPromises);
    response.status(200).send('ok');
  });

const fetchCharactersTopic = 'fetch-characters-topic';
exports.getCharacter = functions
  .runWith({ memory: '1GB' })
  //.https.onRequest(async (request, response) => {
  .pubsub.topic(fetchCharactersTopic)
  .onPublish(async (msg) => {
    try {
      const { id } = msg.json
      //const { id } = request.query;
      const characterRef = await db.collection("characters").doc(id).get();

      const character = characterRef.data();

      if (!character) {
        response.status(404).json({ 'message': 'Character not found' });
        return;
      }

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.goto(urlBaseCharacter(id));

      const html = await page.evaluate(() => {
        return document.querySelector('.mw-content-text').innerHTML
      })

      const $ = cheerio.load(html);

      character.name = $('aside > h2').text() || null;

      const charactersImages = [];

      $('aside > section').each((_, e) => {
        $(e).find('div').each((_, info) => {
          const value = $(info).attr('data-source') || null;
          if (value) {
            if (value === 'gender') {
              character[value] = $(info).find('img').attr('alt') || null
            }
            else if (value === 'family') {
              character[value] = $(info).find('a').map((_, familyMember) => {
                const familyMemberId = $(familyMember).attr('href') || null
                const familyMemberName = $(familyMember).text() || null

                return {
                  id: familyMemberId.replace('/wiki/', ''),
                  name: familyMemberName
                }
              }).toArray();
            }
            else if (value === 'age') {
              const age = $(info).find('div').text();
              if (age.includes(')')) {
                character.ages = age.split(')').filter(e => e !== '').map(e => { return { age: e.split('(')[0], when: e.split('(')[1] } });
              }
            }
            else if (value === 'quirk') {

              if ($(info).find('div').contents().length > 1) {
                character[value] = $(info).find('div').contents().map((_, quirk) => {
                  return $(quirk).contents().first().text() || null;
                }).toArray().join(', ');
              } else {
                character[value] = $(info).find('div').text();
              }


            }
            else if (value === 'occupation') {
              character[value] = $(info).find('div').contents().map((_, occupation) => {
                return $(occupation).text();
              }).toArray().filter(e => !e.includes('(')).join(', ').replace(', , ', ', ');
            }
            else if (value === 'teams') {
              character[value] = $(info).find('div').contents().map((_, team) => {
                return $(team).text();
              }).toArray().join(', ').replace(', , ', ', ');
            }
            else if (value.includes('voice')) {
              return;
            }
            else {
              character[value] = $(info).find('div').contents().first().text() || null;
            }
          }
        })
      });


      $('aside').each((_, e) => {
        $(e).find('.image-thumbnail').each((index, image) => {
          const findImage = $(image).attr('href')
          if (!findImage.includes('/wiki/')) {

            const referenceCode = `${id}-${index + 1}.jpg`;
            const pathImg = path.join(os.tmpdir(), referenceCode)


            download(findImage, pathImg).then(() => {
              storageRef.bucket('my-hero-academia-api').upload(pathImg), {
                destination: referenceCode
              }
              return;
            }).catch(err => {
              console.error(err);
            });

            charactersImages.push(referenceCode);
          }
        })
      })

      character.description = ($('nav').prevAll('p').map((_, description) => {
        return $(description).contents().text().replace(/\[.*?\]/, '')
      }).toArray().reverse().join(''));

      const uniqueImages = new Set(charactersImages.concat(character.images))
      character.images = [...uniqueImages]

      var docRef = db.collection("characters").doc(id);

      await docRef.update(character);
      //response.status(200).json(character);
    } catch (error) {
      console.error(error)
    }
  });


async function download(url, dest) {


  const file = fs.createWriteStream(dest);

  await new Promise((resolve, reject) => {
    request({
      uri: url,
      gzip: true,
    })
      .pipe(file)
      .on('finish', async () => {
        console.log(`The file is finished downloading.`);
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  })
    .catch((error) => {
      console.log(`Something happened: ${error}`);
    });
}
