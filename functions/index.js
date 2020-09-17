const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const baseUrl = 'https://bokunoheroacademia.fandom.com/wiki';
const urlBaseCharacters = () => `${baseUrl}/List_of_Characters`;
const urlBaseCharacter = (id) => `${baseUrl}/${id}`;

exports.getCharacters = functions
  .runWith({ memory: '1GB' })
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


    listHtml.forEach(e => {
      const $ = cheerio.load(e);

      const image = $('img').attr('data-src');
      const name = $('.chargallery-profile-caption').text();
      const id = $('a').attr('href');

      const character = {
        name,
        id: id.replace('/wiki/', ''),
        image
      };

      const docRef = db.collection('characters').doc(character.id);

      docRef.set(character);
    })

    // const snapshot = await db.collection('characters').get();

    // const characters = [];
    // snapshot.forEach(e => {
    //   characters.push(e.data());
    // })

    response.status(200).send('ok');
  });


exports.getCharacter = functions
  .runWith({ memory: '1GB' })
  .https.onRequest(async (request, response) => {

    const { id } = request.query;
    if (!id) {
      response.status(400).json({ 'message': 'Missing id query' })
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

    const character = {
      id,
      name: $('aside > h2').text() || null,
      images: [],
    }


    $('aside > section').each((_, e) => {
      //get attributes
      $(e).find('div').each((_, info) => {
        const value = $(info).attr('data-source') || null;
        if (value) {
          if (value === 'gender') {

            character[value] = $(info).find('img').attr('alt') || null
          } else {
            character[value] = $(info).find('div').contents().first().text() || null;
          }
        }
      })



    });


    $('aside').each((_, e) => {
      $(e).find('.image-thumbnail').each((_, image) => {
        const findImage = $(image).attr('href')

        if (!findImage.includes('/wiki/')) {
          character.images.push(findImage);
        }

      })
    })



    response.status(200).json(character);
  });