// React
import React, { useEffect, useContext } from "react";

// Constants
import { timeStrToNum } from "consts";

// Context
import { AppContext } from "Contexts/app";

// APIS
import SWAPI from "Apis/SWAPI";

// Components
import Container from "Components/Container";

// Styles
import {} from "./style";

// Container StarshipsList
const StarshipsList = () => {
  // Attributes
  const { state, dispatch } = useContext(AppContext);

  // Functions
  const getStarships = async () => {
    const starshipsRequest = await SWAPI.getStarships(state.apiPage);

    dispatch({
      type: "SET_STARSHIPS_LIST",
      data: [...state.starshipsList, ...starshipsRequest.data.results],
    });

    if (!!starshipsRequest.data.next) {
      dispatch({
        type: "SET_API_PAGE",
        data: state.apiPage + 1,
      });
    } else {
      dispatch({
        type: "SET_CAN_SHOW",
        data: true,
      });
    }
  };

  const getStops = (starship: any) => {
    if (starship.consumables !== "unknown" && starship.MGLT !== "unknown") {
      const consumables = starship.consumables.split(" ");

      if (consumables[1] !== "hours") {
        const timeText = consumables[1].toLowerCase();

        if (timeText.includes("year")) {
          consumables[1] = timeStrToNum.years;
        } else if (timeText.includes("month")) {
          consumables[1] = timeStrToNum.months;
        } else if (timeText.includes("week")) {
          consumables[1] = timeStrToNum.weeks;
        } else if (timeText.includes("day")) {
          consumables[1] = timeStrToNum.days;
        }

        return Math.floor(
          1000000 / (consumables[0] * consumables[1] * 24 * starship.MGLT)
        );
      } else if (consumables[1] === "hours") {
        return Math.floor(
          1000000 / (consumables[0] * consumables[1] * starship.MGLT)
        );
      }
    } else {
      return "Unknown";
    }
  };

  useEffect(() => {
    getStarships();
  }, [state.apiPage]);

  // DOM
  return (
    <Container>
      {state.canShow &&
        state.starshipsList.map(
          (starshipItem: any, starshipItemKey: number) => {
            return (
              <div key={`starship-item-${starshipItemKey}`}>{`${
                starshipItem.name
              }: ${getStops(starshipItem)}`}</div>
            );
          }
        )}
    </Container>
  );
};

export default StarshipsList;
