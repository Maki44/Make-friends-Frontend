import { ACTIVITIES_FETCHED, ACTIVITY_ADDED, JOIN_ACTIVITY } from "./actions";
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
    case JOIN_ACTIVITY: {
      const { activityId, user } = action.payload;
      const updateActivities = state.allActivities.map((activity) => {
        if (activity.id === activityId) {
          return { ...activity, users: [...activity.users, user] };
        } else {
          return activity;
        }
      });
      return {
        ...state,
        allActivities: updateActivities,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
