export const selectPassions = (state) => {
  if (!state.passions.allPassions) {
    return null;
  } else {
    return state.passions.allPassions.map((passion) => passion.name);
  }
};
