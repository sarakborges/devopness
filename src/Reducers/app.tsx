import { App } from "Interfaces/app";
import { Action } from "Types/action";

export const appReducer = (state: App, action: Action) => {
  switch (action.type) {
    case "SET_STARSHIPS_LIST": {
      return { ...state, starshipsList: action.data };
    }

    case "SET_API_PAGE": {
      return { ...state, apiPage: action.data };
    }

    case "SET_CAN_SHOW": {
      return { ...state, canShow: action.data };
    }

    default: {
      throw new Error(`Unknown type ${action.type} reducer on AppReducer`);
    }
  }
};
