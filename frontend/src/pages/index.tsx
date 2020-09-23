import { GetStaticProps } from 'next'
import Head from 'next/head'
import process from 'process'
import React from 'react'
import useSWR from 'swr'

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
  const result = await returnCharactersResult(baseURL)
  return {
    props: {
      baseURL,
      result
    }
  }
}

interface Props {
  result: any
  baseURL: string
}

const Home: React.FC<Props> = (props: Props) => {
  const { data } = useSWR(
    `${props.baseURL}/api/character`,
    async () => returnCharactersResult(props.baseURL),
    {
      initialData: props.result
    }
  )

  if (!data) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <Head>
        <title>My Hero Academia API</title>
      </Head>

      <main>
        <h1>Welcome to My Hero Academia API</h1>
      </main>

      {data.result.map(character => (
        <p key={character.id}>{character.name}</p>
      ))}
    </div>
  )
}

export default Home
