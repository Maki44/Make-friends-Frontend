import { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col } from "react-bootstrap";

const MoodCard = (props) => {
  const [show, setShow] = useState(false);
  const [maxPersons, setMaxPersons] = useState(null);
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [description, setDescription] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitForm = () => {
    console.log("submitted");
  };
  const { name } = props;
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
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
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Max persons</Form.Label>
                <Form.Control
                  value={maxPersons}
                  onChange={(event) => setMaxPersons(event.target.value)}
                  type="number"
                  placeholder="Max pesrsons"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Min Age</Form.Label>
                <Form.Control
                  value={minAge}
                  onChange={(event) => setMinAge(event.target.value)}
                  type="number"
                  placeholder="Min Age"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Max Age</Form.Label>
                <Form.Control
                  value={maxAge}
                  onChange={(event) => setMaxAge(event.target.value)}
                  type="number"
                  placeholder="Max Age"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  type="text"
                  placeholder="put description"
                />
              </Form.Group>
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
