import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  ACTIVITY_CREATED,
  DISJOIN_ACTIVITY_USER,
  UPDATE_USER_BIO_PASSIONS,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  userActivity: [],
  userPassions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", action.payload.token);
      const { passions } = action.payload;
      return { ...state, ...action.payload, userPassions: passions };
    }
    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID: {
      const { passions } = action.payload;
      return { ...state, ...action.payload, userPassions: passions };
    }
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
    case UPDATE_USER_BIO_PASSIONS: {
      const { bio, passions } = action.payload;
      return {
        ...state,
        bio,
        userPassions: [...passions],
      };
    }
    default:
      return state;
  }
};

export default reducer;
