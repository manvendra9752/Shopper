import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex items-center justify-center max-w-screen-lg m-auto w-[100%] p-4">
      <div
        className="md:max-w-screen-2xl sm:max-w-screen-lg max-w-[440px] container sm:px-12 px-3  p-2 flex justify-center items-center mx-auto "
        style={{
          background: "linear-gradient(180deg, #fde1ff, #e1ffea22 60%)",
        }}
      >
        <div className="flex flex-col justify-center items-center p-5 m-10">
          <h1 className="md:text-4xl sm:text-3xl text-xl text-center my-auto sm:pt-10 p-8 text-black">
            Get Exclusive Offers On Your Email
          </h1>
          <p className="uppercase sm:mt-2 text-center md:text-base text-xs p-2">
            Subscribe to our newsletter and stay updated
          </p>
          <span className="relative">
            <input
              className="border-2  text-sm  border-black rounded-full px-4 py-2 mt-4 sm:w-80 w-64"
              type="text"
              placeholder="Enter your email"
            />
            <button className="bg-black text-white duration-500 hover:bg-pink-200 hover:text-black rounded-full text-xs md:px-4 sm:px-2 p-3 md:mt-8 sm:mt-5 mt-3 cursor-pointer absolute bottom-[0.1px]  right-[0.01px]">
              Subscribe Now
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
