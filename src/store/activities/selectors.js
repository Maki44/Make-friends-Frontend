export const selectAllActivities = (state) => state.activities.allActivities;
export const selectUsers = (id) => (state) => {
  if (!state.activities.allActivities) {
    return state.activities.users;
  } else {
    const activity = state.activities.allActivities.find(
      (activity) => activity.id === parseInt(id)
    );
    const { users } = activity;
    return users;
  }
};
