import styled from 'styled-components'

export const NavbarDiv = styled.nav`
  position: fixed;
  background: var(--main-color);
  height: 50px;
  width: 100vw;
  transition: all 0.2s ease-in;
  z-index: 1000;
  box-shadow: 1px 0 2px gray;
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    max-width: 70vw;
  }
  
  a {
    color: #e9e9e9;
    padding: 8px;
    margin: 0;
    border-radius: 5px;
  }

  a:hover, a:focus {
    background: #757763;
    color: #e9e9e9;
  }

  .navbar-brand, .left-menu {
    display: flex;
    align-content: center;
    gap: 10px;
  }

  #nav-home-link {
    display: inline-flex;
    justify-content: center;
  }

  .burger {
    display: none;
  }

  // Override parent styles for link selection
  .burger a:hover, .burger a:focus {
    background: none;
  }
  
  @media (max-width: 768px) {
    .navbar-burger {
      display: inline-block;
    }

    .container {
      max-width: 95vw;
    }

    .left-menu {
      display: none;
    }

    .burger {
      display: unset;
    }

    .burger a {
      display: flex;
      align-content: center;
    }
  }
`

export const Dropdown = styled.div`

`