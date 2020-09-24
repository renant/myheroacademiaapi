import { shade } from 'polished'
import styled from 'styled-components'

export const Nav = styled.nav`
  background: ${props => props.theme.colors.primary};
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  padding: 0 20px;

  a {
    justify-self: flex-start;
    margin-right: auto;
    display: flex;
    img {
      width: 100%;
      max-width: 40px;
      height: auto;
    }
  }

  h2 {
    color: ${props => props.theme.colors.background};
  }
`
export const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100px;
  align-items: center;
`
interface LinkProps {
  active?: boolean
}

export const Link = styled.a<LinkProps>`
  color: ${props => (props.active ? '#A2A2A2' : props.theme.colors.background)};
  text-decoration: none;
  &:hover {
    color: ${props => shade(0.5, '#fff')};
  }
  h2 {
    color: ${props =>
    props.active ? '#A2A2A2' : props.theme.colors.background};
    font-weight: 300;
    &:hover {
      color: ${props => shade(0.5, '#fff')};
    }
  }
`
