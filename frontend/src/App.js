import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route exact path="/register" element={<Home />} />
          <Route path="/search/:keyword" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
