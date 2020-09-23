import { GetStaticProps } from 'next'
import Head from 'next/head'
import process from 'process'
import React from 'react'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      teste: process.env.BASE_URL
    }
  }
}

interface Props {
  teste: string
}

const Home: React.FC<Props> = (props: Props) => {
  console.log(props.teste)
  return (
    <div>
      <Head>
        <title>My Hero Academia API</title>
      </Head>

      <main>
        <h1>Welcome to My Hero Academia API</h1>
      </main>
    </div>
  )
}

export default Home
