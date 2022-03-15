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
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import("./style.css");
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
      </Container>

      <div
        style={{
          display: "flex",
          marginLeft: 580,
          marginTop: 20,
        }}
      >
        <h3>Your username: {user.name}</h3>
      </div>
      <div style={{ display: "flex" }}>
        <div className="AvatarMySpace">
          <img src={user.avatar} alt="user avatar" />
        </div>
        <div className="PassionUserMySpace">
          <div>
            <p>My Passion: </p>
          </div>
          <div style={{ display: "flex" }}>
            {passions &&
              passions.map((passion, i) => (
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={passion}
                    style={{ marginLeft: 10, marginBottom: 80 }}
                    variant="outlined"
                  ></Chip>
                </Stack>
              ))}
          </div>
          <p>Bio:</p>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default MySpace;
