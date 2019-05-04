import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    color: #262626;
    font-size: 14px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
`

export default GlobalStyle
