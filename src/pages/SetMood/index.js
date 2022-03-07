import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoodCard from "../../components/MoodCard";
import { fetchMoods } from "../../store/moods/actions";
import { selectMoods } from "../../store/moods/selectors";
const SetMood = () => {
  const dispatch = useDispatch();
  const moods = useSelector(selectMoods);
  useEffect(() => {
    dispatch(fetchMoods());
  }, [dispatch]);
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {moods &&
        moods.map((mood) => {
          return <MoodCard key={mood.id} name={mood.name} />;
        })}
    </div>
  );
};

export default SetMood;
