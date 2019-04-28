import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    background-color: #fafafa;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    color: #262626;
    font-size: 14px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`

export default GlobalStyle
