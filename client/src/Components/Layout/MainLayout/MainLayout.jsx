// src/Components/Layout/MainLayout/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <>
        <Outlet />
      </>
      <Footer />
    </div>
  );
};

export default MainLayout;
