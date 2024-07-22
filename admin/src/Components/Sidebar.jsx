import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-w-fit sm:w-fit  md:h-screen md:fixed">
      <button
        className="block md:hidden p-2 bg-blue-500 text-white rounded-md m-2"
        onClick={toggleSidebar}
      >
        Menu
      </button>
      <div
        className={`${isOpen ? "block" : "hidden"} md:block min-w-fit p-2 m-2`}
      >
        <Link to="/addproduct" style={{ textDecoration: "none" }}>
          <div className="flex justify-between items-center m-1 hover:bg-gray-50 p-3  transition min-w-fit bg-white rounded-lg">
            <BsFillCartCheckFill className="text-yellow-400 text-3xl min-w-fit" />
            <p className="pl-2 min-w-fit">Add Product</p>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="flex justify-between items-center m-1 hover:bg-gray-50 p-3 bg-white rounded-lg transition min-w-fit">
            <FaClipboardList className="text-3xl text-blue-500 min-w-fit" />
            <p className="pl-2 min-w-fit">Product List</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
