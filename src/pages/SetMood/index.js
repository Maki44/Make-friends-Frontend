import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoodCard from "../../components/MoodCard";
import { fetchMoods } from "../../store/moods/actions";
import { selectMoods } from "../../store/moods/selectors";
import { selectToken } from "../../store/user/selectors";
const SetMood = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moods = useSelector(selectMoods);
  useEffect(() => {
    dispatch(fetchMoods());
  }, [dispatch]);
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {moods &&
        moods.map((mood) => {
          return <MoodCard key={mood.id} name={mood.name} id={mood.id} />;
        })}
    </div>
  );
};

export default SetMood;
