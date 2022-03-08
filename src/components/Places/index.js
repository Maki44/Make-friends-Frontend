import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { locationAdded } from "../../store/places/actions";
const Places = (props) => {
  const { name, rating, location } = props.place;
  const dispatch = useDispatch();
  const addLocation = () => {
    dispatch(locationAdded(location));
  };
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{`rating ${rating}`}</Card.Text>
        <Button onClick={addLocation}>Add Location</Button>
      </Card.Body>
    </Card>
  );
};

export default Places;
