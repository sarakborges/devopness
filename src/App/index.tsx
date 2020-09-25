import React from "react";

import StarshipsList from "Containers/StarshipsList";

import "reset.css";
import { GlobalStyle } from "./style";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StarshipsList />
    </>
  );
};

export default App;
