import styled from 'styled-components'
// import '../../node_modules/highlight.js/styles/nord.css'

export const ImageContainer = styled.div`
  background: #ffde59;
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 175px;
    height: auto;
  }
`

export const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  div:first-child {
    max-width: 1425px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`
