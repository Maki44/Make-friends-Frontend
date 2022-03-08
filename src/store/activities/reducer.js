import { ACTIVITIES_FETCHED, ACTIVITY_ADDED } from "./actions";
const initialState = {
  allActivities: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITIES_FETCHED: {
      return {
        ...state,
        allActivities: action.payload,
      };
    }
    case ACTIVITY_ADDED: {
      return {
        ...state,
        allActivities: [...state.allActivities, { ...action.payload.activity }],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
