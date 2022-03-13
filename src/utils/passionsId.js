export const passionids = (allPassions, passions) => {
  console.log("pasionsssss", allPassions);
  const userPassions = allPassions.filter((passion) => {
    return passions.includes(passion.name);
  });
  console.log("whyyyyyyyy", userPassions);
  const userPassionsId = userPassions.map((passion) => passion.id);
  return userPassionsId;
};
