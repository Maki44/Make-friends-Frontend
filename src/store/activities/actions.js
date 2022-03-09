import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken } from "../user/selectors";
export const ACTIVITY_ADDED = "ACTIVITY_ADDED";
export const ACTIVITIES_FETCHED = "ACTIVITIES_FETCHED";
export const JOIN_ACTIVITY = "JOIN_ACTIVITY";
export const USERS_FETCHED = "USERS_FETCHED";
export const DISJOIN_ACTIVITY = "DISJOIN_ACTIVITY";

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
export const userDisjoinActivity = (data) => {
  return {
    type: DISJOIN_ACTIVITY,
    payload: data,
  };
};
export const activitiesFetched = (data) => {
  return {
    type: ACTIVITIES_FETCHED,
    payload: data,
  };
};

export const usersFetched = (data) => {
  return {
    type: USERS_FETCHED,
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
      console.log("response from activities", response);
      dispatch(activitiesFetched(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUsersForSpecificActivities = (id) => {
  return async function (dispatch, getState) {
    const token = selectToken(getState());
    try {
      const response = await axios.get(`${apiUrl}/activities/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("meeeee", response);
      dispatch(usersFetched(response.data.users));
    } catch (error) {
      console.log(error);
    }
  };
};
