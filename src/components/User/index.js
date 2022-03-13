import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const User = (props) => {
  const { name, avatar } = props.user;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Add as Friend</Button>
      </Card.Body>
    </Card>
  );
};
export default User;
