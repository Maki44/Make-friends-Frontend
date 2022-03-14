import { apiUrl } from "../../config/constants";
import axios from "axios";
export const Avatar_FETCHED = "Avatar_FETCHED";
const avatarFetched = (data) => {
  return {
    type: Avatar_FETCHED,
    payload: data,
  };
};
export const fetchAvatar = () => {
  return async function (dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/avatars`);
      dispatch(avatarFetched(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
