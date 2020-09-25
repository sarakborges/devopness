import { createGlobalStyle } from "styled-components";

import Theme from "theme";

export const GlobalStyle = createGlobalStyle`
body {
  background: ${Theme.dark};

  font-family: ${Theme.mainfont};
  font-size: 14px;
  color: ${Theme.light};
}
`;
