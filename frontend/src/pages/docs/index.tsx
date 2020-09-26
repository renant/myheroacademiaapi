import Markdown from 'markdown-to-jsx'
import { GetStaticProps } from 'next'
import process from 'process'
import React from 'react'
import Highlight from 'react-highlight'
import {
  Container,
  DocumentContainer,
  MainContainer,
  Section,
  SideBar
} from '../../styles/Docs/style'

interface Props {
  introduction: string
  pageOneSample: string
  getPageExaplain: string
  queryPageSample: string
  characterIntroduction: string
  sampleAllCharacters: string
  getSingleCharacter: string
  getSingleCharacterSample: string
  getFilterCharacters: string
  getFilterSampleRequest: string
  getFilterSampleResult: string
}

export const getStaticProps: GetStaticProps = async () => {
  const baseURL = process.env.BASE_URL

  const introduction = `
  <span class="anchor" id="introduction-id"></span>
  ## Introduction
  This documentation will help you to get familiar with the resources of **My Hero Academia API** and show you how make requests to get characters

  <span class="anchor" id="rest-id"></span>
  ### REST
  #### **Base url:** ${baseURL}/api
  All the requests are **GET** and resposes will return data in **json** format.

  <span class="anchor" id="info-pagination-id"></span>
  ### Info and Pagination
  The lists return paginated responses. You can receive up to 20 documents per page


  |Key|Type|Description|
  |---|---|---|
  |count|int|The length of the response
  |pages|int|The amount of pages
  |currrentPag|int|The current page

  *Sample request*
  `

  const pageOneSample = `
  {
    "info": {
      "currentPage": 1,
      "count": 318,
      "pages": 16
    },
    "result": [
      // ...
    ]
  }`

  const getPageExaplain = `
  To access other pages you can just inform query parameter **page**. If you don't inform any page, the first page will be returned. For example, you can call page 2 with parameter **?page=2** in the end of URL.

  > ${baseURL}/api/character?page=16
  `

  const queryPageSample = `
  {
    "info": {
      "currentPage": 16,
      "count": 318,
      "pages": 16
    },
    "result": [
      {
        "id": "Uwabami",
        "name": "Uwabami",
        "alias": "Snake Hero: Uwabami",
        "affiliation": null,
        "birthday": "December 9th",
        "bloodtype": "A",
        "description": "Snake Hero: Uwabami (スネークヒーロー ウワバミ, Sunēku Hīrō Uwabami?) is a Pro Hero and a celebrity.",
        "fightstyle": null,
        "gender": "Female",
        "Eye": "Gold",
        "hair": "Blonde",
        "height": "170 cm (5'7)",
        "kanji": null,
        "occupation": "Pro Hero",
        "quirk": "Serpentress",
        "romaji": null,
        "status": "Unknown",
        "teams": null,
        "images": [
          "https://storage.cloud.google.com/my-hero-academia-api/Uwabami-1.jpg",
          "https://storage.cloud.google.com/my-hero-academia-api/Uwabami.jpg"
        ],
        "epithet": null,
        "ages": null,
        "family": null
      },
      // ...
    ]
  }`

  const characterIntroduction = `
  <span class="anchor" id="character-id"></span>
  ## Character
  To get characters sorted by id

  <span class="anchor" id="character-definition-type-id"></span>
  ### Character definition type
  |Key|Type|Description|
  |---|---|---|
  |id|string|The id of the character.
  |name|string|The name of the character.
  |alias|string|The name as hero, villain or nickname.
  |affiliation|string|The affiliation of the character.
  |birthday|string|The birthdate of the character (month and day).
  |bloodtype|string|The bloodtype of the character.
  |description|string|The description of the character.
  |fightstyle|string|The fight style of the character.
  |gender|string|The gender of the character. ('Male' or 'Female').
  |eye|string|The eye of the character.
  |hair|string|The hair of the character.
  |height|string|The height of the character.
  |kanji|string|The name of the character in Japanese.
  |occupation|string|The occupation of the character.
  |romaji|string|The romaji name of the character.
  |status|string|The current status of the character.
  |team|string|The teams that the character composes.
  |images|array[strng]|The urls images of the character.
  |epithet|string|The epithet name of the character.
  |ages|array[object]|The ages of the character when expefic time.
  |family|array[object]|The family of the character, id and name.

  <span class="anchor" id="character-getall-id"></span>
  ### Get all characters
  You can get all characters using **/character** endpoint.

  > ${baseURL}/api/character
  `

  const sampleAllCharacters = `
  {
    "info": {
      "currentPage": 1,
      "count": 318,
      "pages": 16
    },
    "result": [
      {
        "id": "Abegawa_Tenchu_Kai",
        "name": null,
        "alias": null,
        "affiliation": null,
        "birthday": null,
        "bloodtype": null,
        "description": "Abegawa Tenchu Kai (阿辺川天忠會, Abegawa Tenchū-kai?) was a former Yakuza organization appearing in My Hero Academia: Vigilantes.\n",
        "fightstyle": null,
        "gender": null,
        "Eye": null,
        "hair": null,
        "height": null,
        "kanji": "阿辺川天忠會",
        "occupation": "Yakuza",
        "quirk": null,
        "romaji": "Abegawa Tenchū-kai",
        "status": "Disbanded",
        "teams": null,
        "images": [
          "https://storage.cloud.google.com/my-hero-academia-api/Abegawa_Tenchu_Kai-1.jpg",
          "https://storage.cloud.google.com/my-hero-academia-api/Abegawa_Tenchu_Kai.jpg"
        ],
        "epithet": null,
        "ages": null,
        "family": null
      },
      // ...
    ]
  }
  `

  const getSingleCharacter = `
  <span class="anchor" id="character-getsingle-id"></span>
  ### Get a single character
  You can get a single character by adding the **id** as a parameter: **/character/Toshinori_Yagi**

  > ${baseURL}/api/character/Toshinori_Yagi
  `

  const getSingleCharacterSample = `
  {
    "id": "Toshinori_Yagi",
    "name": "Toshinori Yagi",
    "alias": "All Might",
    "affiliation": "U.A. High School",
    "birthday": "June 10",
    "bloodtype": "A",
    "description": "Toshinori Yagi (八 (や) 木 (ぎ) 俊 (とし) 典 (のり) , Yagi Toshinori?), more commonly known by his hero name, All Might (オールマイト, Ōru Maito?), is the tritagonist of My Hero Academia. All Might is the former No. 1 Pro Hero who bore the title of the world's Symbol of Peace (平和の象徴, Heiwa no Shōchō?). He teaches Foundational Hero Studies at U.A. High School. All Might was the eighth holder of the One For All Quirk after receiving it from Nana Shimura. He has since passed the torch to Izuku Midoriya, whom he is training to be his successor. After using up all the embers of One For All to defeat All For One, All Might retired and ended his era as the world's greatest hero.",
    "fightstyle": null,
    "gender": "Male",
    "Eye": "Light Blue",
    "hair": "Blond",
    "height": "220 cm (7'2) (Muscle Form)",
    "kanji": "八 (や) 木 (ぎ) 俊 (とし) 典 (のり) ",
    "occupation": "Pro Hero, Teacher",
    "quirk": "Quirkless, One For All",
    "romaji": "Yagi Toshinori",
    "status": "Alive",
    "teams": "Hideout Raid Team",
    "images": [
      "https://storage.cloud.google.com/my-hero-academia-api/Toshinori_Yagi-1.jpg",
      "https://storage.cloud.google.com/my-hero-academia-api/Toshinori_Yagi-2.jpg",
      "https://storage.cloud.google.com/my-hero-academia-api/Toshinori_Yagi.jpg"
    ],
    "epithet": "Symbol of Peace",
    "ages": null,
    "family": null
  }
  `

  const getFilterCharacters = `
  <span class="anchor" id="character-filter-id"></span>
  ### Filter characters

  It is possible to filter the list of characters by including query params in the URL. To do this, simply add a **'?'** after the query followed by **'query'='valueToFilter'**. If you want to chain several queries in the same call, use **&** followed by the new query.

  For example, if you want get all characters where affiliation is **'U.A.'** and quirk is **'One For All'**, just add  **'?quirk=One For All&affiliation=U.A'**

  #### Available filter parameters:

  - **name:** filter by character name
  - **alias:** filter by character alias
  - **quirk:** filter by character quirk
  - **occupation:** filter by character occupation
  - **affiliation:** filter by character affiliation.
  `

  const getFilterSampleRequest = `
  *Sample request*

  > [${baseURL}/api/character?quirk=One For All&affiliation=U.A](${baseURL}/api/character?quirk=One%20For%20All&affiliation=U.A)
  `
  const getFilterSampleResult = `
  {
    "info": {
      "currentPage": 1,
      "count": 2,
      "pages": 1
    },
    "result": [
      {
        "id": "Izuku_Midoriya",
        "name": "Izuku Midoriya",
        "alias": "Deku",
        "affiliation": "U.A. High School",
        "birthday": "July 15",
        "bloodtype": "O",
        "description": "Izuku Midoriya (緑 (みどり) 谷 (や) 出 (いず) 久 (く) , Midoriya Izuku?), also known as Deku (デク, Deku?), is the primary protagonist of the My Hero Academia manga and anime series. Though born Quirkless, Izuku manages to catch the attention of the legendary hero All Might due to his innate heroism and strong sense of justice and has since become his close pupil as well as a student in Class 1-A at U.A. High School. All Might passed on his Quirk to Izuku, making him the ninth holder of One For All.",
        "fightstyle": null,
        "gender": "Male",
        "Eye": "Green",
        "hair": "Green",
        "height": "166 cm (5'5)",
        "kanji": "緑 (みどり) 谷 (や) 出 (いず) 久 (く) ",
        "occupation": "Student",
        "quirk": "Quirkless, One For All, Blackwhip",
        "romaji": "Midoriya Izuku",
        "status": "Alive",
        "teams": "Team Midoriya (Leader), Shie Hassaikai Raid Team",
        "images": [
          "https://storage.cloud.google.com/my-hero-academia-api/Izuku_Midoriya-1.jpg",
          "https://storage.cloud.google.com/my-hero-academia-api/Izuku_Midoriya-2.jpg",
          "https://storage.cloud.google.com/my-hero-academia-api/Izuku_Midoriya-3.jpg",
          "https://storage.cloud.google.com/my-hero-academia-api/Izuku_Midoriya.jpg"
        ],
        "epithet": null,
        "ages": [
          {
            "age": "4 ",
            "when": "First Appearance"
          },
          {
            "age": "14 ",
            "when": "Chapter 1-2"
          },
          {
            "age": "15 ",
            "when": "Chapter 3 to Provisional Hero License Exam Arc"
          },
          {
            "age": "16 ",
            "when": "Current"
          }
        ],
        "family": [
          {
            "id": "Inko_Midoriya",
            "name": "Inko Midoriya"
          },
          {
            "id": "Hisashi_Midoriya",
            "name": "Hisashi Midoriya"
          }
        ]
      },
      {
        "id": "Toshinori_Yagi",
        "name": "Toshinori Yagi",
        "alias": "All Might",
        "affiliation": "U.A. High School",
        "birthday": "June 10",
        "bloodtype": "A",
        "description": "Toshinori Yagi (八 (や) 木 (ぎ) 俊 (とし) 典 (のり) , Yagi Toshinori?), more commonly known by his hero name, All Might (オールマイト, Ōru Maito?), is the tritagonist of My Hero Academia. All Might is the former No. 1 Pro Hero who bore the title of the world's Symbol of Peace (平和の象徴, Heiwa no Shōchō?). He teaches Foundational Hero Studies at U.A. High School. All Might was the eighth holder of the One For All Quirk after receiving it from Nana Shimura. He has since passed the torch to Izuku Midoriya, whom he is training to be his successor. After using up all the embers of One For All to defeat All For One, All Might retired and ended his era as the world's greatest hero.",
        "fightstyle": null,
        "gender": "Male",
        "Eye": "Light Blue",
        "hair": "Blond",
        "height": "220 cm (7'2) (Muscle Form)",
        "kanji": "八 (や) 木 (ぎ) 俊 (とし) 典 (のり) ",
        "occupation": "Pro Hero, Teacher",
        "quirk": "Quirkless, One For All",
        "romaji": "Yagi Toshinori",
        "status": "Alive",
        "teams": "Hideout Raid Team",
        "images": [
          "https://storage.cloud.google.com/my-hero-academia-api/Toshinori_Yagi-1.jpg",
          "https://storage.cloud.google.com/my-hero-academia-api/Toshinori_Yagi-2.jpg",
          "https://storage.cloud.google.com/my-hero-academia-api/Toshinori_Yagi.jpg"
        ],
        "epithet": "Symbol of Peace",
        "ages": null,
        "family": null
      }
    ]
  }
  `

  return {
    props: {
      introduction,
      pageOneSample,
      getPageExaplain,
      queryPageSample,
      characterIntroduction,
      sampleAllCharacters,
      getSingleCharacter,
      getSingleCharacterSample,
      getFilterCharacters,
      getFilterSampleRequest,
      getFilterSampleResult
    }
  }
}

const Doc: React.FC<Props> = (props: Props) => {
  const {
    introduction,
    pageOneSample,
    getPageExaplain,
    queryPageSample,
    characterIntroduction,
    sampleAllCharacters,
    getSingleCharacter,
    getSingleCharacterSample,
    getFilterCharacters,
    getFilterSampleRequest,
    getFilterSampleResult
  } = props
  return (
    <Container>
      <SideBar>
        <ul>
          <Section>
            <a href="#introduction-id">Introduction</a>
            <ul>
              <li>
                <a href="#rest-id">REST</a>
              </li>
              <li>
                <a href="#info-pagination-id">Info and Pagination</a>
              </li>
            </ul>
          </Section>
          <Section>
            <a href="#character-id">Character</a>
            <ul>
              <li>
                <a href="#character-definition-type-id">
                  Character definition type
                </a>
              </li>
              <li>
                <a href="#character-getall-id">Get all characters</a>
              </li>
              <li>
                <a href="#character-getsingle-id">Get a single character</a>
              </li>
              <li>
                <a href="#character-filter-id">Filter characters</a>
              </li>
            </ul>
          </Section>
        </ul>
      </SideBar>
      <MainContainer>
        <DocumentContainer>
          <Markdown>{introduction}</Markdown>
          <Highlight language="json">{pageOneSample}</Highlight>
          <Markdown>{getPageExaplain}</Markdown>
          <Highlight language="json">{queryPageSample}</Highlight>
          <Markdown>{characterIntroduction}</Markdown>
          <Highlight language="json">{sampleAllCharacters}</Highlight>
          <Markdown>{getSingleCharacter}</Markdown>
          <Highlight language="json">{getSingleCharacterSample}</Highlight>
          <Markdown>{getFilterCharacters}</Markdown>
          <Markdown>{getFilterSampleRequest}</Markdown>
          <Highlight language="json">{getFilterSampleResult}</Highlight>
        </DocumentContainer>
      </MainContainer>
    </Container>
  )
}

export default Doc
