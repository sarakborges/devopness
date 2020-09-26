import styled from "styled-components";

import Theme from "theme";

export const GetDistanceWrapper = styled.form`
  padding-top: calc(50vh - 30px);
`;

export const GetDistance = styled.form`
  display: flex;

  overflow: hidden;

  border-radius: 15px;
  background: ${Theme.light};
`;

export const GetDistanceInput = styled.input`
  flex: 1;

  height: 60px;
  padding: 0 15px;

  background: none;
  border: none;
  outline: none;

  font-size: 20px;
`;

export const GetDistanceSubmit = styled.button`
  margin: 3px;
  padding: 0 15px;

  border-radius: 15px;
  border: 0;
  background: gold;

  color: ${Theme.dark};
  font-size: 16px;
  font-weight: 700;
`;

interface Props {
  isVisible: boolean;
}
export const StarshipsListWrapper = styled.div<Props>`
  max-height: ${(props) => (props.isVisible ? "2000px" : 0)};
  margin-top: 30px;
  overflow: hidden;

  transition: max-height 1s;
`;

export const StarshipItem = styled.div`
  padding: 5px 0;

  font-size: 18px;
  color: gold;

  span {
    font-weight: 700;
  }
`;
