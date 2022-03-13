import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import mood from "./moods/reducer";
import activities from "./activities/reducer";
import places from "./places/reducer";
import passions from "./passions/reducer";

export default combineReducers({
  appState,
  user,
  mood,
  activities,
  places,
  passions,
});
