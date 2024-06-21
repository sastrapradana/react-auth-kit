import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register.jsx";
import AuthProvider from "react-auth-kit";
import { store } from "./utils/store.js";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Home from "./pages/home/Home.jsx";
import Profle from "./pages/profile/profile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/register" element={<Register />} />
          <Route element={<AuthOutlet fallbackPath="/" />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profle />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
