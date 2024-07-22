import React from "react";
import hand_icon from "../images/Assets/hand_icon.png";
import { FaArrowTrendUp } from "react-icons/fa6";
import hero_image from "../images/Assets/hero_image.png";

const Hero = () => {
  return (
    <div
      className="md:max-w-screen-xl sm:max-w-screen-xl max-w-screen-lg mx-auto w-fit  sm:px-10 p-1 py-2 flex items-center justify-center"
      style={
        {
          // background: "linear-gradient(180deg, #fde1ff, #e1ffea22 60%)",
        }
      }
    >
      <div className="w-1/3 m-auto p-2 justify-center items-center md:mt-24 sm:mt-20 mt-16">
        <h2 className="uppercase md:text-2xl sm:text-lg text-sm">
          New Arrivals Only
        </h2>
        <h1 className="md:text-6xl sm:text-5xl text-3xl">
          new{" "}
          <span
            className="md:w-20 md:h-20 sm:w-14 sm:h-14 w-10 h-10"
            style={{
              backgroundImage: `url(${hand_icon})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            }}
          ></span>
          collections for everyone
        </h1>
        <button className="bg-red-500 md:w-52 sm:w-36 w-24 text-white rounded-full mt-4 sm:p-2 sm:px-5 px-2 md:px-6 md:text-base sm:text-sm text-xs text-center flex items-center hover:border-2 hover:border-red-700 hover:text-red-700 hover:bg-white hover:font-semibold min-w-fit">
          Latest collections{" "}
          <FaArrowTrendUp className=" w-6 h-6 m-2  hover:text-red-700 hover:bg-white" />
        </button>
      </div>
      <div className="w-[45%] md:w-[40%] sm:w-[42%] m-auto h-auto">
        <img src={hero_image}></img>
      </div>
    </div>
  );
};

export default Hero;
