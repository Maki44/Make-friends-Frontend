import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  ACTIVITY_CREATED,
  DISJOIN_ACTIVITY_USER,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  userActivity: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };
    case ACTIVITY_CREATED: {
      return {
        ...state,
        userActivity: [{ ...action.payload }],
      };
    }
    case DISJOIN_ACTIVITY_USER: {
      const { activityId } = action.payload;
      const newUserActivity = state.userActivity.filter(
        (activity) => activity.activityId !== activityId
      );
      return {
        ...state,
        userActivity: newUserActivity,
      };
    }
    default:
      return state;
  }
};

export default reducer;
