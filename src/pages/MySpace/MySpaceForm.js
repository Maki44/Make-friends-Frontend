import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { fetchPassions } from "../../store/passions/actions";
import { selectPassions } from "../../store/passions/selectors";
import { updateUserProfile } from "../../store/user/actions";
import { selectUserPassions } from "../../store/user/selectors";

export default function MySpaceForm(props) {
  const user = useSelector(selectUser);
  const passions = useSelector(selectPassions);
  const userPassions = useSelector(selectUserPassions);
  const [value, setValue] = useState(userPassions);
  const handleChange = (val) => {
    console.log("what is val", val);
    setValue(val);
  };
  const dispatch = useDispatch();
  const [bio, setBio] = useState(user.bio || "");

  useEffect(() => {
    dispatch(fetchPassions());
  }, [dispatch]);

  function submitForm(event) {
    event.preventDefault();
    dispatch(updateUserProfile(bio, value));
    props.setEditMode(false);
  }
  return (
    <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
      <h1 className="mt-5 mb-5">Edit your space</h1>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          type="text"
          placeholder="Tell the world who you are."
        />
      </Form.Group>
      {passions && (
        <Form.Group>
          <Form.Label>
            Let everyone know what you are passionate about.
          </Form.Label>
          <ToggleButtonGroup
            type="checkbox"
            value={value}
            onChange={handleChange}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {passions.map((passion, i) => {
              return (
                <ToggleButton key={i} id={`tbg-btn-${i + 1}`} value={passion}>
                  {passion}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Form.Group>
      )}

      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Save changes
        </Button>
      </Form.Group>
    </Form>
  );
}
