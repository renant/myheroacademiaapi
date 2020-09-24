import { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { ThemeProvider } from 'styled-components'
import { Link, LinksContainer, Nav } from '../styles/app'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  console.log(router.route === '/docs')
  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <a href="/">
          <img src="ms-icon-70x70.png" />
        </a>
        <LinksContainer>
          <Link href="/docs" active={router.route === '/docs'}>
            <h2>DOCS</h2>
          </Link>
          <Link href="https://github.com/renant">
            <AiFillGithub size={24} />
          </Link>
        </LinksContainer>
      </Nav>
      <>
        <Component {...pageProps} />
        <GlobalStyle />
      </>
    </ThemeProvider>
  )
}

export default MyApp
