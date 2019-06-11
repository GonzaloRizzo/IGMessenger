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

  ::-webkit-scrollbar-thumb {
      background: #ccc;
      border: 2px solid transparent;
      background-clip: padding-box;
  }
  ::-webkit-scrollbar {
      width: 8px;
      background: transparent;  /* Optional: just make scrollbar invisible */
  }
  
  button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
  }
`

export default GlobalStyle
