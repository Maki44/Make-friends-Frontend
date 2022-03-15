import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUser,
  selectUserPassions,
  selectToken,
} from "../../store/user/selectors";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import MySpaceForm from "./MySpaceForm";
import MyAvatarForm from "./AvatarForm";
const MySpace = () => {
  const user = useSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const [avatarMode, setAvatarMode] = useState(false);
  const passions = useSelector(selectUserPassions);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div>
      <Container>
        {
          <Card>
            <Button onClick={() => setEditMode(!editMode)}>
              {editMode ? "Close" : "Edit my space"}
            </Button>
            <Button onClick={() => setAvatarMode(!avatarMode)} className="mt-2">
              {avatarMode ? "Close" : "Update My Avatar"}
            </Button>
          </Card>
        }

        {editMode && (
          <Card>
            <MySpaceForm setEditMode={setEditMode} />
          </Card>
        )}

        {avatarMode && (
          <Card>
            <MyAvatarForm setAvatarMode={setAvatarMode} />
          </Card>
        )}
        <h3>{user.name}</h3>
        <img src={user.avatar} alt="user avatar" />
        {passions && (
          <ul>
            {passions.map((passion, i) => (
              <li key={i}>{passion}</li>
            ))}
          </ul>
        )}

        <p>{user.bio}</p>
      </Container>
    </div>
  );
};

export default MySpace;
