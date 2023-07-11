import axios from "axios";

const starWarsBaseURL = "https://swapi.dev/api/";

export const API_GET_STAR_WARS_CHARACTER = async (page) => {
  return await axios
    .get(starWarsBaseURL + "/people/?page=" + page)
    .catch((error) => error);
};

export const API_GET_STAR_WARS_CHARACTER_HOME = async (planetId) => {
  return await axios
    .get(starWarsBaseURL + `/planets/${planetId}`)
    .catch((error) => error);
};

export const API_GET_DATA_FROM_URL = async (URL) => {
  return await axios.get(URL).catch((error) => error);
};
