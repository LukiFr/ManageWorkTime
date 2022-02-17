import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    
    *,*::after,*::before {
        box-sizing: border-box;
    }
    
    

  }
`;

export default GlobalStyle;
