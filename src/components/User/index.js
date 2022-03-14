import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const User = (props) => {
  const { name, avatar, bio } = props.user;
  console.log("user information", props.user);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default User;
