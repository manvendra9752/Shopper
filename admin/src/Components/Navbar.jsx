import React from "react";
import logo from "../assets/logo.png";
import drop from "../assets/dropdown_icon.png";

const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 w-full sm:px-10 p-1 py-2 bg-white shadow-md z-50">
        <div className="justify-between flex items-center">
          <div className="w-fit h-fit flex">
            <img className="md:w-12 md:h-12 w-10 h-10" src={logo} alt="Logo" />
            <a className="btn btn-ghost sm:text-xl font-semibold sm:w-fit sm:h-fit text-lg m-1">
              SHOPPER
              <div className="text-xs text-red-300">admin panel</div>
            </a>
          </div>
          <div className="w-fit h-fit flex items-center justify-around">
            <img
              className="md:w-12 md:h-12 w-10 h-10 rounded-full mr-2"
              src="https://img.freepik.com/premium-photo/smiling-millennial-confident-black-guy-posing-photo-looking-camera_709984-1764.jpg?size=626&ext=jpg"
              alt="profile"
            />
            <img
              className="w-3 h-2 cursor-pointer"
              src={drop}
              alt="dropdown arrow"
            />
          </div>
        </div>
      </div>
      <div className="mt-16">
        {/* This div adds margin to avoid overlapping the content with the fixed navbar */}
      </div>
      <hr />
    </>
  );
};

export default Navbar;
