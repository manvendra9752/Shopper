import { createContext, useEffect, useState } from "react";
// import all_product from "../images/Assets/all_product.js";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_products(data.products));

    if (localStorage.getItem("token")) {
      fetch(`http://localhost:4000/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          token: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCartItems(data.cartData);
          } else {
            console.error("Error getting cart items:", data.message);
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
    }
  }, []);
  console.log("all products", all_product);

  //add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Initialize to 0 if undefined
    }));

    const token = localStorage.getItem("token");
    console.log(token, itemId);
    if (token) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => {
          console.log("response", response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            console.log("Product added to cart:", data);
          } else {
            console.error("Error adding product to cart:", data.message);
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
    const token = localStorage.getItem("token");
    console.log(token, itemId);
    if (token) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => {
          console.log("response", response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            console.log("Product added to cart:", data);
          } else {
            console.error("Error adding product to cart:", data.message);
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
