import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from "./components/Login/LoginForm";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";

import UserProfile from "./components/UserProfile/UserProfile";
import Design from "./components/Dashboard/Design";
import DirectChatPage from "./components/Direct Chat/DirectChatPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* // password and login  */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Design />} />
        <Route path="/directchatpage" element={<DirectChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
