import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Avatar from "avataaars";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvatar } from "../../store/avatar/actions";
import { selectAllAvatar } from "../../store/avatar/selectors";
import { updateUserAvatar } from "../../store/user/actions";
import { selectUserAvatar } from "../../store/user/selectors";
export default function MyAvatarForm(props) {
  const dispatch = useDispatch();
  const avatar = useSelector(selectAllAvatar);
  const userAvatar = useSelector(selectUserAvatar);
  const [accessories, setAccessories] = useState(
    userAvatar["accessoriesType"] || ""
  );
  const [hairStyles, setHairStyles] = useState(userAvatar["topType"] || "");
  const [hairColors, setHairColors] = useState(userAvatar["hairColor"] || "");
  const [hatColors, setHatColors] = useState(userAvatar["hatColor"] || "");
  const [facialHairs, setFacialHairs] = useState(
    userAvatar["facialHairType"] || ""
  );
  const [clothes, setClothes] = useState(userAvatar["clotheType"] || "");
  const [eyes, setEyes] = useState(userAvatar["eyeType"] || "");
  const [eyebrow, setEyebrow] = useState(userAvatar["eyebrowType"] || "");
  const [mouth, setMouth] = useState(userAvatar["mouthType"] || "");
  const [skin, setSkin] = useState(userAvatar["skinColor"] || "");
  const [showHatColor, setShowHatColor] = useState(false);
  function submitForm(event) {
    event.preventDefault();
    dispatch(
      updateUserAvatar({
        hairStyles,
        accessories,
        hairColors,
        hatColors,
        facialHairs,
        clothes,
        eyes,
        eyebrow,
        mouth,
        skin,
      })
    );
    props.setAvatarMode(false);
  }
  useEffect(() => {
    dispatch(fetchAvatar());
  }, [dispatch]);

  useEffect(() => {
    if (
      hairStyles === "Hijab" ||
      hairStyles === "Turban" ||
      hairStyles === "WinterHat1" ||
      hairStyles === "WinterHat2" ||
      hairStyles === "WinterHat3" ||
      hairStyles === "WinterHat4"
    ) {
      setShowHatColor(true);
    } else {
      setShowHatColor(false);
    }
  }, [hairStyles]);
  return (
    <div>
      {avatar && (
        <Form as={Col} md={{ span: 6, offset: 3 }}>
          <h1 className="mt-5 mb-5">My Avatar</h1>
          <Form.Group>
            <Form.Label htmlFor="hairStyle">Hair Style</Form.Label>{" "}
            <select
              id="hairStyle"
              onChange={(e) => setHairStyles(e.target.value)}
            >
              {avatar.hairStyles.map((hairStyle) => (
                <option key={hairStyle.id} value={hairStyle.name}>
                  {hairStyle.name}
                </option>
              ))}
            </select>
          </Form.Group>
          {showHatColor ? (
            <Form.Group>
              <Form.Label htmlFor="hatColor">Hat Color</Form.Label>{" "}
              <select
                id="hatColor"
                onChange={(e) => setHatColors(e.target.value)}
              >
                {avatar.hatColors.map((hatColor) => (
                  <option key={hatColor.id} value={hatColor.name}>
                    {hatColor.name}
                  </option>
                ))}
              </select>
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label htmlFor="hairColor">Hair Color</Form.Label>{" "}
              <select
                id="hairColor"
                onChange={(e) => setHairColors(e.target.value)}
              >
                {avatar.hairColors.map((hairColor) => (
                  <option key={hairColor.id} value={hairColor.name}>
                    {hairColor.name}
                  </option>
                ))}
              </select>
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label htmlFor="accessories">Accessories</Form.Label>{" "}
            <select
              id="accessories"
              onChange={(e) => setAccessories(e.target.value)}
            >
              {avatar.accessories.map((accessory) => (
                <option key={accessory.id} value={accessory.name}>
                  {accessory.name}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="facialHair">Facial Hair</Form.Label>{" "}
            <select
              id="facialHair"
              onChange={(e) => setFacialHairs(e.target.value)}
            >
              {avatar.facialHairs.map((facialHair) => (
                <option key={facialHair.id} value={facialHair.name}>
                  {facialHair.name}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="clothes">Clothes</Form.Label>{" "}
            <select id="clothes" onChange={(e) => setClothes(e.target.value)}>
              {avatar.clothes.map((cloth) => (
                <option key={cloth.id} value={cloth.name}>
                  {cloth.name}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="eyes">Eyes</Form.Label>{" "}
            <select id="eyes" onChange={(e) => setEyes(e.target.value)}>
              {avatar.eyes.map((eye) => (
                <option key={eye.id} value={eye.name}>
                  {eye.name}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="eyebrow">Eyebrow</Form.Label>{" "}
            <select id="eyebrow" onChange={(e) => setEyebrow(e.target.value)}>
              {avatar.eyebrows.map((eyebrow) => (
                <option key={eyebrow.id}>{eyebrow.name}</option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="mouth">Mouth</Form.Label>{" "}
            <select id="mouth" onChange={(e) => setMouth(e.target.value)}>
              {avatar.mouthes.map((mouth) => (
                <option key={mouth.id} value={mouth.name}>
                  {mouth.name}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="skin">Skin</Form.Label>{" "}
            <select id="skin" onChange={(e) => setSkin(e.target.value)}>
              {avatar.skins.map((skin) => (
                <option key={skin.id} value={skin.name}>
                  {skin.name}
                </option>
              ))}
            </select>
          </Form.Group>
          <Avatar
            avatarStyle="Circle"
            topType={hairStyles}
            accessoriesType={accessories}
            hairColor={hairColors}
            hatColor={hatColors}
            facialHairType={facialHairs}
            clotheType={clothes}
            eyeType={eyes}
            eyebrowType={eyebrow}
            mouthType={mouth}
            skinColor={skin}
          />

          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Update!
            </Button>
          </Form.Group>
        </Form>
      )}
    </div>
  );
}
