import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  a{
    color: #FFFFFF;
  }

  a, button{
    cursor: pointer;
  }

  ul{
    list-style: none;
  }

`;