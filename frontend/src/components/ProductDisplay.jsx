import React, { useContext } from "react";
import { GoStarFill } from "react-icons/go";
import { ShopContext } from "../context/ShopContext";

const ProductDisplay = (props) => {
  const { addToCart } = useContext(ShopContext);
  const { removeFromCart } = useContext(ShopContext);
  const { product } = props;
  // console.log("jdf", product.id);

  return (
    <div className="flex justify-center md:flex-row items-center max-w-screen-xl mx-auto container px-6 p-4 h-full flex-col">
      {/* <h1 className="uppercase text-3xl">Your Product</h1> */}
      <hr />
      <div className="flex flex-row items-center justify-start min-w-fit m-8">
        <div className="flex flex-col items-center">
          <img className="p-1 pt-0 h-[8.8rem] w-44" src={product.image} />
          <img className="p-1 pt-0  h-[8.7rem] w-44" src={product.image} />
          <img className="p-1 pt-0 pb-0 h-[8.7rem]  w-44" src={product.image} />
          {/* <img className="p-1" src={product.image} /> */}
        </div>
        <div className="sm:min-h-full  min-w-fit w-full">
          <img className="min-h-full " src={product.image} />
        </div>
      </div>
      <div>
        <div className="lg:text-3xl sm:text-2xl text-xl font-bold m-auto p-2">
          {product.name}
        </div>
        <div className="flex items-center text-red-600 p-2">
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <span className="text-black pl-2">(332)</span>
        </div>
        <div className="flex p-2">
          <div className="line-through font-semibold p-2">
            ${product.old_price}{" "}
          </div>
          <div className="text-red-600 font-semibold p-2">
            ${product.new_price}
          </div>
        </div>
        <div>{product.description}</div>
        <div className="p-4">Select Size</div>
        <div className="flex justify-start items-center m-2 mt-4 mb-4">
          <div className=" bg-slate-100 w-7 h-8 m-1 text-center rounded-md ">
            <p className="mt-1">S</p>
          </div>
          <div className=" bg-slate-100 w-7 h-8 m-1 text-center rounded-md ">
            <p className="mt-1">M</p>
          </div>
          <div className=" bg-slate-100 w-7 h-8 m-1 text-center rounded-md ">
            <p className="mt-1">L</p>
          </div>
          <div className=" bg-slate-100 w-9 h-8 m-1 text-center rounded-md ">
            <p className="mt-1">XL</p>
          </div>
          <div className=" bg-slate-100 w-11 h-8 m-1 text-center rounded-md ">
            <p className="mt-1">XXL</p>
          </div>
        </div>
        <button
          className="btn rounded-none max-w-fit  px-6 m-4 text-xs  rounded-tl-xl rounded-br-xl bg-red-600 text-white hover:bg-red-700"
          onClick={() => {
            console.log(product.id);
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>
        <div className="p-4 font-semibold">
          Category:
          <span className="font-normal">
            {product.category}, T-shirt, Hoodie
          </span>
        </div>
        <div className="p-4 font-semibold">
          Tags: <span className="font-normal">Modern, Latest</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
