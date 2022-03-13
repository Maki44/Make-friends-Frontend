import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectUsers } from "../../store/activities/selectors";
import { fetchUsersForSpecificActivities } from "../../store/activities/actions";
import { selectToken } from "../../store/user/selectors";
import User from "../../components/User";
const Users = () => {
  const { id } = useParams();
  const users = useSelector(selectUsers(id));
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users) {
      dispatch(fetchUsersForSpecificActivities(id));
    }
  }, [dispatch, users, id]);
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
      {users && users.map((user) => <User key={user.id} user={user} />)}
    </div>
  );
};

export default Users;
