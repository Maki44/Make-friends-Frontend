import axios from "axios";
import { apiUrl } from "../../config/constants";

export const Mood_Fetched = "Mood_Fetched";
const moodsFetched = (data) => {
  return {
    type: Mood_Fetched,
    payload: data,
  };
};

export const fetchMoods = () => {
  return async function (dispatch, getState) {
    try {
      const respnse = await axios.get(`${apiUrl}/moods`);
      console.log("moods", respnse);
      dispatch(moodsFetched(respnse.data));
    } catch (error) {
      console.log(error);
    }
  };
};
