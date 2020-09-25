import Markdown from 'markdown-to-jsx'
import { GetStaticProps } from 'next'
import React from 'react'
import Highlight from 'react-highlight'
import {
  Container,
  DocumentContainer,
  MainContainer,
  SideBar
} from '../../styles/Docs/style'

interface Props {
  introduction: string
  pageOneSample: string
  getPageExaplain: string
  queryPageSample: string
  characterIntroduction: string
}

export const getStaticProps: GetStaticProps = async () => {
  const baseURL = process.env.BASE_URL

  const introduction = `
  ## Introduction
  This documentantion will help you get familiar with resource of the **My Hero Academia API** and show you how make requests to get characters

  ### REST
  #### **Base url:** ${baseURL}/api
  The all requests are **GET** and resposes will return data in **json** format.

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
  ## Character
  To get characters sorted by id

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
  `

  return {
    props: {
      introduction,
      pageOneSample,
      getPageExaplain,
      queryPageSample,
      characterIntroduction
    }
  }
}

const Doc: React.FC<Props> = (props: Props) => {
  const {
    introduction,
    pageOneSample,
    getPageExaplain,
    queryPageSample,
    characterIntroduction
  } = props
  return (
    <Container>
      <SideBar></SideBar>
      <MainContainer>
        <DocumentContainer>
          <Markdown>{introduction}</Markdown>
          <Highlight language="json">{pageOneSample}</Highlight>
          <Markdown>{getPageExaplain}</Markdown>
          <Highlight language="json">{queryPageSample}</Highlight>
          <Markdown>{characterIntroduction}</Markdown>
        </DocumentContainer>
      </MainContainer>
    </Container>
  )
}

export default Doc
