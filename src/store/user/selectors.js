export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;

export const checkUserIfJoinOrNot = (id) => (state) => {
  const userActivity = state.user.userActivity;
  if (userActivity.length === 0) {
    return false;
  } else {
    const activity = userActivity.find(
      (activity) => activity.activityId === id
    );
    //console.log("activity", activity);
    if (!activity) {
      return false;
    } else {
      return true;
    }
  }
};

export const selectUserPassions = (state) => {
  const passions = state.user.userPassions.map((passion) => {
    return passion.name;
  });
  return passions;
};
