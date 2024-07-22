import React, { useContext, useEffect, useState } from "react";
import logo from "../images/Assets/logo.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [active, setActive] = useState("Shop");
  const { cartItems } = useContext(ShopContext);
  const [count, setCount] = useState(0);

  const getCount = (cartItems) => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) totalCount++;
    }
    setCount(totalCount);
  };

  useEffect(() => {
    getCount(cartItems);
  }, [cartItems]);

  return (
    <div className="sm:max-w-screen-xl md:max-w-screen-2xl mx-auto sm:container sm:px-10 p-1 py-2 max-w-screen-md">
      <div className="navbar justify-between">
        <div className="w-fit h-fit">
          <Link to={"/"}>
            {" "}
            <img className="md:w-12 md:h-12 w-10 h-10" src={logo} alt="Logo" />
            <a className="btn btn-ghost sm:text-xl font-semibold sm:w-fit sm:h-fit hidden text-lg">
              SHOPPER
            </a>
          </Link>
        </div>
        <div>
          <ul className="flex flex-row items-center justify-center rounded-box">
            <li
              onClick={() => setActive("Shop")}
              className="sm:px-4 px-2 cursor-pointer"
            >
              <Link to="/">
                Shop{" "}
                {active === "Shop" && (
                  <div className="h-1 text-red-500 border-none bg-red-500 rounded-full sm:text-base text-sm"></div>
                )}
              </Link>
            </li>
            <li
              onClick={() => setActive("Men")}
              className="sm:px-4 px-2 cursor-pointer"
            >
              <Link to="/mens">
                Men{" "}
                {active === "Men" && (
                  <div className="h-1 text-red-500 bg-red-500 rounded-full"></div>
                )}
              </Link>
            </li>
            <li
              onClick={() => setActive("Women")}
              className="sm:px-4 px-2 cursor-pointer"
            >
              <Link to="/womens">
                Women{" "}
                {active === "Women" && (
                  <div className="h-1 text-red-500 bg-red-500 rounded-full"></div>
                )}
              </Link>
            </li>
            <li
              onClick={() => setActive("Kids")}
              className="sm:px-4 px-2 cursor-pointer"
            >
              <Link to="/kids">
                Kids{" "}
                {active === "Kids" && (
                  <div className="h-1 text-red-500 bg-red-500 rounded-full"></div>
                )}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end flex items-center">
            <Link
              to="/cart"
              onClick={() => setActive("cart")}
              className="sm:px-4 px-2 cursor-pointer"
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>

                  <span className="badge badge-sm indicator-item bg-red-600 text-white">
                    {count}
                  </span>
                </div>
              </div>
              {active === "cart" && (
                <div className="h-1 text-red-500 bg-red-500 rounded-full"></div>
              )}
            </Link>
            {localStorage.getItem("token") ? (
              <Link to={"/"}>
                <button
                  className="rounded-full px-2 sm:px-6 sm:ml-6 p-1 sm:text-sm text-xs border-2 border-slate-400 text-slate-400 hover:text-black hover:border-black m-auto"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="rounded-full px-2 sm:px-6 sm:ml-6 p-1 sm:text-sm text-xs border-2 border-slate-400 text-slate-400 hover:text-black hover:border-black m-auto">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="bg-slate-500 text-slate-400 h-[1px]"></div>
    </div>
  );
};

export default Navbar;
