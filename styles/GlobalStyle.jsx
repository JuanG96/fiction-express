import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

  h1, h2, h3, h4, h5, h6, a, p, button {
    font-family: 'Montserrat';
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
