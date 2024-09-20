import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/userData";
import "./App.css";

// Import your components
import AuthLayout from "./auth";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";

import GreenGuide from "./pages/GreenGuide/GreenGuide";
import Profile from "./pages/Profile/Profile";
import Carbon from "./pages/Carbon/Carbon";
import Reedem from "./pages/Reedem/Reedem";
import { currentUser } from "./connecting"; // Ensure this is correctly imported
import Button from "./pages/Button/Button";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // use lowercase 'dispatch'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await currentUser();
        //console.log(res.message);
        dispatch(login(res.message)); // dispatch the login action
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    load();
  }, [dispatch]); // include dispatch in the dependency array

  if (loading) {
    return <div>Loading...</div>; // Show loading until the user data is fetched
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route
            path="/Login"
            element={
              <AuthLayout authentication={false}>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/Addimage"
            element={
              <AuthLayout authentication={true}>
                <Button />
              </AuthLayout>
            }
          />
          <Route path="/GreenGuide" element={<GreenGuide />} />
          <Route
            path="/Profile"
            element={
              <AuthLayout authentication={true}>
                <Profile />
              </AuthLayout>
            }
          />
          <Route path="/footprint" element={<Carbon />} />
          <Route path="/reedem" element={<Reedem />} />
          <Route path="/leader" element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
