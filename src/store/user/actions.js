import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { passionids } from "../../utils/passionsId";
import {
  userJoinActivity,
  activityAdded,
  userDisjoinActivity,
} from "../activities/actions";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import {
  selectLocation,
  selectPlaceName,
  selectPlacePhoto,
} from "../places/selectors";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const ACTIVITY_CREATED = "ACTIVITY_CREATED";
export const DISJOIN_ACTIVITY_USER = "DISJOIN_ACTIVITY_USER";
export const UPDATE_USER_BIO_PASSIONS = "UPDATE_USER_BIO_PASSIONS";
export const UPDATE_USER_AVATAR = "UPDATE_USER_AVATAR";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};
const activityCreatedSuccess = (data) => {
  return {
    type: ACTIVITY_CREATED,
    payload: data,
  };
};
const disjoinUserActivity = (id) => {
  return {
    type: DISJOIN_ACTIVITY_USER,
    payload: { activityId: id },
  };
};
const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});
const updateUserBioPassions = (data) => {
  return {
    type: UPDATE_USER_BIO_PASSIONS,
    payload: data,
  };
};
const userAvatar = (data) => {
  return {
    type: UPDATE_USER_AVATAR,
    payload: data,
  };
};
export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password, lat, lng) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
        lat,
        lng,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password, lat, lng) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
        lat,
        lng,
      });

      dispatch(loginSuccess(response.data));
      console.log("login", response.data);
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const createNewActivity = (data) => {
  return async function (dispatch, getState) {
    const { minAge, maxAge, maxPersons, description, id } = data;
    const token = selectToken(getState());
    const { lat, lng } = selectLocation(getState());
    const placeName = selectPlaceName(getState());
    const photo = selectPlacePhoto(getState());
    try {
      const response = await axios.post(
        `${apiUrl}/activities/${id}`,
        {
          minAge,
          maxAge,
          maxPersons,
          description,
          id,
          lat,
          lng,
          placeName,
          photo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        activityAdded({
          activity: {
            ...response.data.activity,
            users: [{ ...response.data.user }],
          },
          userId: response.data.user.id,
        })
      );
      delete response.data["user"];
      dispatch(activityCreatedSuccess({ ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const joinActivity = (id) => {
  return async function (dispatch, getState) {
    const token = selectToken(getState());
    try {
      const response = await axios.post(
        `${apiUrl}/activities/join/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        userJoinActivity({
          activityId: response.data.activityId,
          user: { ...response.data.user },
        })
      );
      delete response.data["user"];
      dispatch(activityCreatedSuccess({ ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const disJoinActivity = (id) => {
  return async function (dispatch, getState) {
    const token = selectToken(getState());
    try {
      const response = await axios.put(
        `${apiUrl}/activities/disjoin/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(userDisjoinActivity(response.data));
      dispatch(disjoinUserActivity(response.data.id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserProfile = (bio, passions) => {
  return async function (dispatch, getState) {
    const token = selectToken(getState());
    // add a function that will get you passions id
    const allPassions = getState().passions.allPassions;
    const passionIds = passionids(allPassions, passions);
    try {
      const response = await axios.put(
        `${apiUrl}/passions/update`,
        { bio, passionIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response edit", response);
      const { data } = response;
      dispatch(
        updateUserBioPassions({ bio: data.bio, passions: data.passions })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserAvatar = (avatarCharacters) => {
  return async function (dispatch, getState) {
    const {
      hairStyles,
      accessories,
      hairColors,
      hatColors,
      facialHairs,
      clothes,
      eyes,
      eyebrow,
      mouth,
      skin,
    } = avatarCharacters;
    const img = `https://avataaars.io/?avatarStyle=Circle&topType=${hairStyles}&accessoriesType=${accessories}&hairColor=${hairColors}&hatColor=${hatColors}&facialHairType=${facialHairs}&clotheType=${clothes}&eyeType=${eyes}&eyebrowType=${eyebrow}&mouthType=${mouth}&skinColor=${skin}`;
    try {
      const token = selectToken(getState());
      const response = await axios.put(
        `${apiUrl}/avatars/user`,
        { avatar: img },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { avatar } = response.data;
      console.log("Avatart", response.data);
      dispatch(userAvatar({ avatar }));
    } catch (error) {
      console.log(error);
    }
  };
};
