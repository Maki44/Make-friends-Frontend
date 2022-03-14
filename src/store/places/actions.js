import axios from "axios";
import { apiUrl } from "../../config/constants";
export const PLACES_FETCHED = "PLACES_FETCHED";
export const LOCATION_ADDED = " LOCATION_ADDED";
const placesFetched = (data) => {
  return {
    type: PLACES_FETCHED,
    payload: data,
  };
};
export const searchPlacesNearBy = (name) => {
  return async function (dispatch, getState) {
    const { user } = getState();
    const { lat, lng } = user;
    try {
      const response = await axios.get(
        `${apiUrl}/activities/places/${name}/${lat}/${lng}`
      );
      console.log("results from serach near by", response.data);
      const results = response.data.slice(0, 3);
      console.log(results);
      dispatch(placesFetched(results));
    } catch (error) {
      console.log(error);
    }
  };
};

export const locationAdded = (data) => {
  return {
    type: LOCATION_ADDED,
    payload: data,
  };
};
