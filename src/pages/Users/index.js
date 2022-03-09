import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectUsers } from "../../store/activities/selectors";
import { fetchUsersForSpecificActivities } from "../../store/activities/actions";
import User from "../../components/User";
const Users = () => {
  const { id } = useParams();
  const users = useSelector(selectUsers(id));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users) {
      dispatch(fetchUsersForSpecificActivities(id));
    }
  }, []);

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
