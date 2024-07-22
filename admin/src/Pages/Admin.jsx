import React from "react";
import Sidebar from "../Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Addproduct from "../Components/Addproduct";
import ListProduct from "../Components/ListProduct";

const Admin = () => {
  return (
    <div className="md:flex">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/" element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
