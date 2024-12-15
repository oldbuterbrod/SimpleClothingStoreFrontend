import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home"; 
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import InformationContainer from "./components/InformationContainer/InformationContainer";
import Product from "./pages/Product"; 
import Contacts from "./pages/Contacts"; 
import Stores from "./pages/Stores";
import Autorisation from "./pages/Autorisation";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Logo from "./logo/Logo";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <Logo />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/autorisation" element={<Autorisation />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/stores" element={<Stores />} />
          </Routes>
        </div>
        <InformationContainer />
      </Router>
    </div>
  );
}

export default App;
