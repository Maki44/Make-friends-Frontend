import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserIfJoinOrNot } from "../../store/user/selectors";
import { joinActivity, disJoinActivity } from "../../store/user/actions";
import { selectUserActivityId } from "../../store/user/selectors";
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
  const { socket } = props;
  const { name } = mood;
  const userJoin = useSelector(checkUserIfJoinOrNot(id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const room = useSelector(selectUserActivityId);
  const join = () => {
    dispatch(joinActivity(id));
  };
  const disjoin = () => {
    dispatch(disJoinActivity(id));
  };

  const chat = () => {
    socket.emit("join_room", room);
    navigate("/chat");
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
        {users.length < maxPersons ? (
          userJoin ? (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button onClick={disjoin}>Disjoin </Button>
              <Button onClick={chat}>Chat </Button>
            </div>
          ) : (
            <Button onClick={join}>Join</Button>
          )
        ) : userJoin ? (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button onClick={disjoin}>Disjoin </Button>
            <Button onClick={chat}>Chat </Button>
          </div>
        ) : (
          <Button onClick={join} disabled>
            Join
          </Button>
        )}
        {/* {userJoin ? (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button onClick={disjoin}>Disjoin </Button>
            <Button onClick={chat}>Chat </Button>
          </div>
        ) : (
          <Button onClick={join}>Join</Button>
        )} */}
      </Card.Body>
    </Card>
  );
};

export default Activity;
