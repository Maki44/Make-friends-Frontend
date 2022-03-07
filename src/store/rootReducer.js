import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import mood from "./moods/reducer";

export default combineReducers({
  appState,
  user,
  mood,
});
