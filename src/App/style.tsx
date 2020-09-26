import { createGlobalStyle } from "styled-components";

import Theme from "theme";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${Theme.dark};

    font-family: ${Theme.mainfont};
    font-size: 14px;
    color: ${Theme.light};

    :before{
      content: '';

      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;

      height: 100%;
      width: 100%;

      background-image: url("https://us.123rf.com/450wm/max79im/max79im1810/max79im181000153/111802494-starrs-in-outer-space-seamless-background-or-texture-illustration.jpg?ver=6");
      background-position: center;

      opacity: .2;
    }
  }
`;
