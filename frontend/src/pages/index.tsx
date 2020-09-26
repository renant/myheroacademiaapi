import { GetStaticProps } from 'next'
import Head from 'next/head'
import process from 'process'
import React from 'react'
import useSWR from 'swr'
import CharacterCard from '../components/CharacterCard'
import { ImageContainer, ListContainer } from '../styles/Home/style'

const returnCharactersResult = async baseURL => {
  const queries = [
    '?occupation=Student&affiliation=U.A',
    '?occupation=Teacher&affiliation=U.A'
  ]

  const response = await fetch(
    `${baseURL}/api/character/${queries[Math.floor(Math.random() * 2)]}`
  )
  return await response.json()
}

export const getStaticProps: GetStaticProps = async () => {
  const baseURL = process.env.BASE_URL

  return {
    props: {
      baseURL
    }
  }
}

interface Props {
  baseURL: string
}

const Home: React.FC<Props> = (props: Props) => {
  const { data } = useSWR(`${props.baseURL}/api/character`, async () =>
    returnCharactersResult(props.baseURL)
  )

  return (
    <div>
      <Head>
        <title>My Hero Academia API</title>
      </Head>

      <main>
        <ImageContainer>
          <img src="my-hero-api.png"></img>
        </ImageContainer>
      </main>

      {!data ? (
        <h1>Loading...</h1>
      ) : (
          <ListContainer>
            <div>
              {data.result.map(character => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  alias={character.alias}
                  image={character.images[character.images.length - 1]}
                  affiliation={character.affiliation}
                  occupation={character.occupation}
                  quirk={character.quirk}
                  baseURL={props.baseURL}
                />
              ))}
            </div>
          </ListContainer>
        )}
    </div>
  )
}

export default Home
