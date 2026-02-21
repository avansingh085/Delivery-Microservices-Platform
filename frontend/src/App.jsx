import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import Header from "./components/Header";
import HomeSlider from "./components/HomeSlider";
import Login from "./pages/LoginPage";
import SignupFlow from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProfilePage from "./pages/ProfilePage";
import { profile } from "./api/userApi";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import { Success } from "./utils/toast";

function App() {
  const [userData, setUserData] = useState(undefined); 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data } = await profile();
        if (success) {
          console.log(" profile data fetched");
          Success("profile fetched!");
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (err) {
        setUserData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header user={userData} cartCount={8} />

        <Routes>
        
          <Route path="/" element={<HomeSlider />} />
          <Route path="items" element={<ItemPage/>}/>

          <Route element={<AuthRoute isPrivate={false} user={userData} />}>
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupFlow />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

        
          <Route element={<AuthRoute isPrivate={true} user={userData} />}>
            <Route path="/profile" element={<ProfilePage profile={userData} />} />
            <Route path="/cart" element={<CartPage/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
