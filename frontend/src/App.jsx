import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/Footer";
import men_banner from "./images/Assets/banner_mens.png";
import women_banner from "./images/Assets/banner_women.png";
import kid_banner from "./images/Assets/banner_kids.png";
import CartItems from "./components/CartItems";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="kids" />}
        />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<CartItems />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
