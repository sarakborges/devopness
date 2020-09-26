// React
import React, { useEffect, useContext, useState } from "react";

// Constants
import { timeStrToNum } from "consts";

// Context
import { AppContext } from "Contexts/app";

// APIS
import SWAPI from "Apis/SWAPI";

// Components
import Container from "Components/Container";

// Styles
import {
  GetDistanceWrapper,
  GetDistance,
  GetDistanceInput,
  GetDistanceSubmit,
  StarshipsListWrapper,
  StarshipItem,
} from "./style";

// Container StarshipsList
const StarshipsList = () => {
  // Attributes
  const { state, dispatch } = useContext(AppContext);
  const [distanceStr, setDistanceStr] = useState<string>("");

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
    if (!distanceStr) {
      return "Impossível calcular";
    }

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
          parseInt(distanceStr) /
            (consumables[0] * consumables[1] * 24 * starship.MGLT)
        );
      } else if (consumables[1] === "hours") {
        return Math.floor(
          parseInt(distanceStr) /
            (consumables[0] * consumables[1] * starship.MGLT)
        );
      }
    } else {
      return "Impossível calcular";
    }
  };

  useEffect(() => {
    getStarships();
  }, [state.apiPage]);

  // DOM
  return (
    <Container>
      <GetDistanceWrapper>
        <GetDistance
          onSubmit={(e) => {
            e.persist();
            e.preventDefault();

            setDistanceStr(() => {
              const el: any = document.querySelector("[name=distance]");
              const val = parseInt(el?.value);

              if (!isNaN(val)) {
                return `${parseInt(el?.value)}`;
              } else {
                return "";
              }
            });
          }}
        >
          <GetDistanceInput
            name="distance"
            placeholder="Quantos MLGTs deseja percorrer? (Apenas números)"
          />

          <GetDistanceSubmit>GO!</GetDistanceSubmit>
        </GetDistance>
      </GetDistanceWrapper>

      <StarshipsListWrapper isVisible={!!(state.canShow && distanceStr)}>
        {state.starshipsList.map(
          (starshipItem: any, starshipItemKey: number) => {
            return (
              <StarshipItem key={`starship-item-${starshipItemKey}`}>
                {`${starshipItem.name}: `}
                <span>{`${getStops(starshipItem)} paradas necessárias`}</span>
              </StarshipItem>
            );
          }
        )}
      </StarshipsListWrapper>
    </Container>
  );
};

export default StarshipsList;
