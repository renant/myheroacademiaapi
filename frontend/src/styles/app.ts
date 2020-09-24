import styled from 'styled-components'

export const Nav = styled.nav`
  background: #ffde59;
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
