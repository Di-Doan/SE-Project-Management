import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from "./components/Login/LoginForm";
import Design from "./components/Dashboard/Design";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Design />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
