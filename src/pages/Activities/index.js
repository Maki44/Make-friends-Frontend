import Activity from "../../components/Activity";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllActivities } from "../../store/activities/actions";
import { selectAllActivities } from "../../store/activities/selectors";
import { selectToken } from "../../store/user/selectors";
import { Button } from "react-bootstrap";
const Activities = (props) => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {activities &&
        (activities.length !== 0 ? (
          activities.map((activity, i) => (
            <Activity key={i} activity={activity} socket={props.socket} />
          ))
        ) : (
          <div>
            <h2>No Activities Near You</h2>
            <Button onClick={() => navigate("/setMood")}>Create One</Button>
          </div>
        ))}
    </div>
  );
};

export default Activities;
