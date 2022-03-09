import {
  ACTIVITIES_FETCHED,
  ACTIVITY_ADDED,
  JOIN_ACTIVITY,
  USERS_FETCHED,
  DISJOIN_ACTIVITY,
} from "./actions";
const initialState = {
  allActivities: null,
  users: null,
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
      const { userId } = action.payload;
      const updatedActivities = state.allActivities.map((activity) => {
        const updatedUsers = activity.users.filter(
          (user) => user.id !== userId
        );
        return { ...activity, users: updatedUsers };
      });
      return {
        ...state,
        allActivities: [...updatedActivities, { ...action.payload.activity }],
      };
    }
    case JOIN_ACTIVITY: {
      const { activityId, user } = action.payload;
      console.log("userrrrr", user);
      const updateActivities = state.allActivities.map((activity) => {
        if (activity.id === activityId) {
          return { ...activity, users: [...activity.users, user] };
        } else {
          const { id } = user;
          const newUser = activity.users.filter((user) => user.id !== id);
          return { ...activity, users: newUser };
        }
      });
      console.log("upsate, activities", updateActivities);
      return {
        ...state,
        allActivities: updateActivities,
      };
    }
    case USERS_FETCHED: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case DISJOIN_ACTIVITY: {
      const { id } = action.payload;
      const newActivities = state.allActivities.map((activity) => {
        if (activity.id === id) {
          return { ...action.payload };
        } else {
          return activity;
        }
      });
      return {
        ...state,
        allActivities: newActivities,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
