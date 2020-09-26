import axios from "axios";

const getStarships = async (page?: Number) => {
  let uri = `https://swapi.dev/api/starships/`;

  if (!!page) {
    uri += `?page=${page}`;
  }

  return await axios.get(uri);
};

const SWAPI = {
  getStarships,
};

export default SWAPI;
