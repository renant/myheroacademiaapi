import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  border-top: 1px solid #ccc;
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding-left: 20px;
  padding-top: 1px;
  border-right: 1px solid #ccc;
`
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h2,
  h3,
  h4 {
    margin: 20px 0;
  }

  p {
    margin: 10px 0;
  }

  a {
    text-decoration: none;
    color: #a2a2a2;
    border-bottom: ${props => `2px solid ${props.theme.colors.primary}`};
    &:hover {
      color: ${props => shade(0.5, '#A2A2A2')};
    }
  }

  pre {
    margin-bottom: 20px;
  }

  blockquote {
    background: #232323;
    padding: 10px;
    margin: 10px 0px;
    display: flex;
    align-items: center;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    text-align: left;
    margin-bottom: 40px;
    thead th {
      border-bottom: solid 1px #ccc;
      padding: 10px;
      text-align: left;
      text-shadow: 1px 1px 1px #fff;
    }
    tbody td {
      border-bottom: solid 1px #ccc;
      padding: 10px;
      text-align: left;
      text-shadow: 1px 1px 1px #fff;
    }
  }
`

export const DocumentContainer = styled.div`
  margin: 50px 0 50px 0;
  max-width: 900px;
`
