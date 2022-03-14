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
export const selectUserActivityId = (state) => {
  const userActivity = state.user.userActivity;
  if (userActivity.length === 0) {
    return null;
  } else {
    return userActivity[0].activityId;
  }
};
export const selectUserPassions = (state) => {
  const passions = state.user.userPassions.map((passion) => {
    return passion.name;
  });
  return passions;
};

export const selectUserAvatar = (state) => {
  let url_string = state.user.avatar;

  const params = new URLSearchParams(url_string);
  const avatarCharacters = {};
  for (const param of params) {
    console.log(param[1]);
    avatarCharacters[param[0]] = param[1];
  }
  return avatarCharacters;
};
