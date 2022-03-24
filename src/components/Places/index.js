import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { locationAdded } from "../../store/places/actions";
const Places = (props) => {
  const { name, rating, location, photo } = props.place;
  const dispatch = useDispatch();
  const addLocation = () => {
    dispatch(locationAdded({ location, name, photo }));
  };
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Img style={{ width: "100%" }} variant="top" src={photo} />
        <Card.Text>{`rating ${rating}`}</Card.Text>
        <Button onClick={addLocation}>Add Location</Button>
      </Card.Body>
    </Card>
  );
};

export default Places;
