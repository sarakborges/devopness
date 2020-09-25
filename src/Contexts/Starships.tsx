import React, { useReducer, createContext } from "react";

const StarshipsContext = createContext({});
const StarshipsDispatchContext = createContext({});

const INITIAL_STATE = {
  isLoading: false,
};

export const starshipsReducer = (state: Object, { type, data }: any) => {
  switch (type) {
    case "SET_IS_LOADING": {
      return { ...state, isLoading: data };
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on StarshipsReducer`);
    }
  }
};

export const StarshipsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(starshipsReducer, INITIAL_STATE);

  return (
    <StarshipsContext.Provider value={state}>
      <StarshipsDispatchContext.Provider value={dispatch}>
        {children}
      </StarshipsDispatchContext.Provider>
    </StarshipsContext.Provider>
  );
};

export const StarshipsConsumer = StarshipsContext.Consumer;

export { StarshipsContext, StarshipsDispatchContext };
