import React from "react";
import offerimg from "../images/Assets/exclusive_image.png";
const ExclusiveOffer = () => {
  return (
    <div className="flex items-center justify-center max-w-screen-lg m-auto w-[80%] ">
      <div
        className="md:max-w-screen-2xl sm:max-w-screen-lg max-w-[440px] container sm:px-16 px-3  p-2 flex justify-between items-center "
        style={{
          background: "linear-gradient(180deg, #fde1ff, #e1ffea22 60%)",
        }}
      >
        <div className="flex flex-col justify-center items-start p-5 ">
          <h1 className="md:text-4xl sm:text-3xl text-xl text-black">
            Exclusive Offer For You
          </h1>
          <p className="uppercase mt-2 text-black">
            {" "}
            only on best sellers products
          </p>
          <button className="bg-red-500 text-white hover:text-red-600 hover:border-2 hover:border-red-600 hover:bg-white rounded-full text-xs md:px-8 sm:px-4 p-2 md:mt-8 sm:mt-5 mt-3 cursor-pointer">
            Check Now
          </button>
        </div>

        <div className="">
          <img src={offerimg} />
        </div>
      </div>
    </div>
  );
};

export default ExclusiveOffer;
