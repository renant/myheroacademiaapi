import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  margin: 10px;

  @media only screen and (max-width: 430px) {
    justify-content: center;
  }
`

export const ImageContainer = styled.div`
  border-radius: 10px 0 0 10px;
  height: 135px;
  width: 135px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 430px) {
    margin-bottom: 10px;
    margin-right: 0px;
    border-radius: 10px;
  }
`

export const DisplayContent = styled.div`
  max-width: 300px;
  width: 300px;
  height: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  margin-bottom: 1px;
  box-shadow: inset 0 -10px 1px -10px #fff;

  h3,
  h5 {
    font-weight: 300;
  }
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    &:hover {
      color: ${props => shade(0.2, props.theme.colors.primary)};
    }
  }

  @media only screen and (max-width: 430px) {
    text-align: center;
    padding-left: 0px;
  }
`
