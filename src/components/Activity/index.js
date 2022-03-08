import { useSelector, useDispatch } from "react-redux";
import { checkUserIfJoinOrNot } from "../../store/user/selectors";
import { joinActivity } from "../../store/user/actions";
const Activity = (props) => {
  const { mood, users, city, maxPersons, minAge, maxAge, id } = props.activity;
  const { name } = mood;
  const userJoin = useSelector(checkUserIfJoinOrNot(id));
  const dispatch = useDispatch();
  const join = () => {
    dispatch(joinActivity(id));
  };
  return (
    <div style={{ width: "300px", border: "5px solid red", margin: "10px" }}>
      <h3>{name}</h3>
      <p>
        Users joined: {users.length}/{maxPersons}
      </p>

      <p>location : {city}</p>
      <p>
        {" "}
        Age range : {minAge} - {maxAge}
      </p>
      <button onClick={join}>{userJoin ? "Disjoin" : "Join"}</button>
    </div>
  );
};

export default Activity;
