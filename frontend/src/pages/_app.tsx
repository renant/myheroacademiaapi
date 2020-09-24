import { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Nav } from '../styles/app'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <a href="/">
          <img src="ms-icon-70x70.png" />
        </a>
        <h2>first</h2>
      </Nav>
      <>
        <Component {...pageProps} />
        <GlobalStyle />
      </>
    </ThemeProvider>
  )
}

export default MyApp
