import styled from 'styled-components'

export const FullScreenContainer = styled.div`
  z-index: 1100;
  position: fixed;
  top: 0;
  right: -100vw;
  margin: 0;
  padding: 0;
  background: #e9e9e9;
  width: 100vw;
  height: 100vh;
  color: black;
  transform: translateX(${props => props.property});
  transition: 0.2s;
`

export const ExitButton = styled.span`
  position: absolute;
  font-size: 3rem;
  right: 20px;
  font-weight: 900;
  user-select: none;

  :hover {
    cursor: pointer;
  }
`

export const MenuList = styled.ul`
  width: 100%;
  margin: 0 auto;
  margin-top: 40px;
  padding: 0;
  list-style: none;
  font-weight: 900;
  line-height: 1.6;
  
  li {
    font-size: 2.5rem;
    text-align: center;
    text-decoration: underline;
  }

  li a {
    color: black;
  }

  .sidebar-footer {
    font-size: 1rem;
    position: absolute;
    bottom: 20px;
    text-align: center;
    width: 100%;
    padding: 0;
    margin: 0;
    color: #A9A9A9;
    font-weight: 200;
  }
`