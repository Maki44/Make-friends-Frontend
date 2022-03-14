import { useSelector, useDispatch } from "react-redux";
import { checkUserIfJoinOrNot } from "../../store/user/selectors";
import { joinActivity, disJoinActivity } from "../../store/user/actions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const Activity = (props) => {
  const {
    mood,
    users,
    address,
    maxPersons,
    minAge,
    maxAge,
    id,
    placeName,
    photo,
  } = props.activity;
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
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Img variant="top" src={photo} />
        <Link to={`/users/${id}`}>
          Users joined: {users.length}/{maxPersons}
        </Link>
        <Card.Text>Location : {address}</Card.Text>
        <Card.Text>Place Name : {placeName}</Card.Text>
        <Card.Text>
          Age range : {minAge} - {maxAge}
        </Card.Text>
        {userJoin ? (
          <Button onClick={disjoin}>Disjoin </Button>
        ) : (
          <Button onClick={join}>Join</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Activity;
