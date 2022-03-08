import Activity from "../../components/Activity";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllActivities } from "../../store/activities/actions";
import { selectAllActivities } from "../../store/activities/selectors";
import { selectToken } from "../../store/user/selectors";
const Activities = () => {
  const activities = useSelector(selectAllActivities);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllActivities());
  }, [dispatch]);
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <>
      {activities &&
        activities.map((activity, i) => (
          <Activity key={i} activity={activity} />
        ))}
    </>
  );
};

export default Activities;
