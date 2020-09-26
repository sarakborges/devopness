// React
import React from "react";

// Context
import { AppProvider } from "Contexts/app";

// Container
import StarshipsList from "Containers/StarshipsList";

// Styles
import "reset.css";
import { GlobalStyle } from "./style";

// App
const App = () => {
  return (
    <AppProvider>
      <GlobalStyle />
      <StarshipsList />
    </AppProvider>
  );
};

export default App;
