import { createGlobalStyle } from 'styled-components'

// Theming variables go in the :root selector here
const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: #bc8f8f;
  }

  ::selection {
    background: rgba(137, 207, 240, 0.5);
  }
`

export default GlobalStyle