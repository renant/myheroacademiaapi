import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: block;
  border-top: 1px solid #ccc;
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: row;
`

export const SideBar = styled.div`
  display: flex;
  top: 0;
  flex-direction: column;
  width: 300px;
  height: 100%;
  position: fixed;
  padding-left: 20px;
  padding-top: 1px;
  border-right: 1px solid #ccc;

  ul:first-child {
    margin-top: 80px;
  }

  @media only screen and (max-width: 1030px) {
    display: none;
  }
`
export const MainContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-left: 300px;

  .anchor {
    display: block;
    height: 60px;
    margin-top: -30px;
    visibility: hidden;
  }

  @media only screen and (max-width: 1030px) {
    margin-left: 0px;
  }

  h2,
  h3,
  h4 {
    margin: 20px 0;
  }

  p {
    margin: 30px 0;
    line-height: 25px;
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
    border-radius: 35px;
    height: 60px;
    p {
      margin-left: 10px;
    }
  }

  code {
    border-radius: 35px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  ul {
    margin-left: 45px;
    margin-bottom: 20px;
    li {
      padding: 12px 0;
    }
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
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media only screen and (max-width: 1030px) {
    max-width: 100%;

    /* margin-left: 20px; */
  }
`

export const Section = styled.li`
  margin-left: 10px;
  margin-bottom: 30px;
  list-style-type: none;
  font-weight: 500;
  a {
    margin-bottom: 5px;
    text-decoration: none;
    color: #232323;
  }

  ul {
    margin-top: 10px;
    list-style-type: none;
  }
  ul > li {
    font-weight: 300;
    margin-left: 1px;
    padding: 5px;
    a {
      text-decoration: none;
      color: #232323;
    }
  }
`

export const Item = styled.li``
