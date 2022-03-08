import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken } from "../user/selectors";
export const ACTIVITY_ADDED = "ACTIVITY_ADDED";
export const ACTIVITIES_FETCHED = "ACTIVITIES_FETCHED";
export const JOIN_ACTIVITY = "JOIN_ACTIVITY";

export const activityAdded = (data) => {
  return {
    type: ACTIVITY_ADDED,
    payload: data,
  };
};
export const userJoinActivity = (data) => {
  return {
    type: JOIN_ACTIVITY,
    payload: data,
  };
};
export const activitiesFetched = (data) => {
  return {
    type: ACTIVITIES_FETCHED,
    payload: data,
  };
};
export const fetchAllActivities = () => {
  return async function (dispatch, getState) {
    const token = selectToken(getState());
    try {
      const response = await axios.get(`${apiUrl}/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log(response);
      dispatch(activitiesFetched(response.data));
    } catch (error) {}
  };
};
