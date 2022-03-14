import Card from "react-bootstrap/Card";

const User = (props) => {
  const { name, avatar, bio, passions } = props.user;
  console.log("user information", props.user);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{bio}</Card.Text>
        {passions ? (
          <div>
            <span>Passions</span>
            <ul>
              {passions.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
};
export default User;
