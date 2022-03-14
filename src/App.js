import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import SetMood from "./pages/SetMood";
import Activities from "./pages/Activities";
import Users from "./pages/Users";
import MySpace from "./pages/MySpace";
import Chat from "./components/Chat";
const socket = io.connect("http://localhost:4000");
function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route path="/setMood" element={<SetMood />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/activities" element={<Activities socket={socket} />} />
        <Route path="/users/:id" element={<Users />} />
        <Route path="/mySpace" element={<MySpace />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
