import React from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className=" p-1 text-start flex flex-col items-center m-1 mb-2">
      <Link to={`/product/${props.id}`}>
        {" "}
        <img
          className="max-w-[90%] h-52 rounded-tl-3xl rounded-br-3xl
            hover:scale-110 duration-500 transition-all ease-in-out mx-auto"
          src={props.image}
          onClick={window.scrollTo(0, 0)}
          alt="image"
        />
        <p className="mx-auto pt-3 p-1 px-6 text-base sm:max-w-[70%] md:max-w-[80%] max-w-[90%] min-w-fit">
          {props.name}
        </p>
        <div className="flex justify-between w-full items-center p-1 px-10">
          <div className="font-semibold text-xl pl-0">${props.new_price}</div>
          <div className="text-red-600 line-through p-2 text-base">
            ${props.old_price}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
