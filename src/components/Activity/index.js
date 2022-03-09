import { useSelector, useDispatch } from "react-redux";
import { checkUserIfJoinOrNot } from "../../store/user/selectors";
import { joinActivity, disJoinActivity } from "../../store/user/actions";
import { Link } from "react-router-dom";
const Activity = (props) => {
  const { mood, users, address, maxPersons, minAge, maxAge, id, placeName } =
    props.activity;
  const { name } = mood;
  const userJoin = useSelector(checkUserIfJoinOrNot(id));
  const dispatch = useDispatch();
  const join = () => {
    dispatch(joinActivity(id));
  };
  const disjoin = () => {
    dispatch(disJoinActivity(id));
  };
  return (
    <div style={{ width: "300px", border: "5px solid red", margin: "10px" }}>
      <h3>{name}</h3>
      <Link to={`/users/${id}`}>
        Users joined: {users.length}/{maxPersons}
      </Link>
      <p>Location : {address}</p>
      <p>Place Name : {placeName}</p>
      <p>
        {" "}
        Age range : {minAge} - {maxAge}
      </p>
      {userJoin ? (
        <button onClick={disjoin}>Disjoin </button>
      ) : (
        <button onClick={join}>Join</button>
      )}
    </div>
  );
};

export default Activity;
