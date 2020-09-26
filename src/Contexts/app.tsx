import React, { useReducer, createContext } from "react";

import { Action } from "Types/action";
import { App } from "Interfaces/app";
import { appReducer } from "Reducers/app";

const initialState: App = {
  starshipsList: [],
  apiPage: 1,
  canShow: false,
};

const AppContext = createContext<{
  state: App;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
