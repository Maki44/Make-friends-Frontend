import axios from "axios";
import { apiUrl } from "../../config/constants";
export const PASSIONS_FETCHED = "PASSIONS_FETCHED";
const passionsFetched = (data) => {
  return {
    type: PASSIONS_FETCHED,
    payload: data,
  };
};
export const fetchPassions = () => {
  return async function (dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/passions`);
      const passions = response.data.map((passion) => {
        return { name: passion.name, id: passion.id };
      });
      dispatch(passionsFetched(passions));
    } catch (error) {
      console.log(error);
    }
  };
};
