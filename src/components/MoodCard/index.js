import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewActivity } from "../../store/user/actions";
import { searchPlacesNearBy } from "../../store/places/actions";
import { selectPlaces, selectLocation } from "../../store/places/selectors";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col } from "react-bootstrap";
import Places from "../Places";
import { useNavigate } from "react-router-dom";

const MoodCard = (props) => {
  const [show, setShow] = useState(false);
  const [maxPersons, setMaxPersons] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const navigate = useNavigate();
  const places = useSelector(selectPlaces);
  const location = useSelector(selectLocation);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const { name, id } = props;
  const handleShow = () => {
    setShow(true);
    let search;
    if (name === "Drink") {
      search = "bar";
    } else if (name === "Eating in a resturant") {
      search = "restaurant";
    } else if (name === "Walk") {
      search = "park";
    } else {
      search = name;
    }

    dispatch(searchPlacesNearBy(search));
  };

  const submitForm = () => {
    dispatch(createNewActivity({ minAge, maxAge, maxPersons, id }));
    setShow(false);
    navigate("/activities");
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ width: "200px", margin: "10px" }}
      >
        {name}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
              <h1 className="mt-5 mb-5">{`I am in mood for ${name}`}</h1>
              <Form.Group>
                <Form.Label>Max persons</Form.Label>
                <Form.Control
                  value={maxPersons}
                  onChange={(event) => setMaxPersons(event.target.value)}
                  type="number"
                  placeholder="Max pesrsons"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Min Age</Form.Label>
                <Form.Control
                  value={minAge}
                  onChange={(event) => setMinAge(event.target.value)}
                  type="number"
                  placeholder="Min Age"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Max Age</Form.Label>
                <Form.Control
                  value={maxAge}
                  onChange={(event) => setMaxAge(event.target.value)}
                  type="number"
                  placeholder="Max Age"
                />
              </Form.Group>

              {places && (
                <Form.Group className="mt-5">
                  Places Nearby
                  {places.map((place, i) => {
                    return <Places key={i} place={place} />;
                  })}
                </Form.Group>
              )}
              {location ? "Location Added" : null}
              <Form.Group className="mt-5">
                <Button variant="primary" type="submit" onClick={submitForm}>
                  Set Mood
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MoodCard;
