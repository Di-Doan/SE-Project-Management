import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from "./components/Login/LoginForm";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";

import UserProfile from "./components/UserProfile/UserProfile";
import DirectChatPage from "./components/Direct Chat/DirectChatPage";
import FindTeam from "./components/FindTeam/FindTeam";
import People from "./components/People/People";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* // password and login  */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/directchatpage" element={<DirectChatPage />} />

        <Route path="/team" element={<FindTeam />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
