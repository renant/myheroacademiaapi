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
  const isDoc = router.route === '/docs'
  return (
    <ThemeProvider theme={theme}>
      <Nav isDoc={isDoc}>
        <a href="/">
          <img src="ms-icon-70x70.png" />
        </a>
        <LinksContainer>
          <Link href="/docs" active={isDoc}>
            <h2>DOCS</h2>
          </Link>
          <Link href="https://github.com/renant/myheroacademiaapi">
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
