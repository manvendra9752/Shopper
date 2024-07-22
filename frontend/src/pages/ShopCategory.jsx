import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Sort by");

  // Ensure all_product is always an array
  const products = all_product || [];

  const toggleSortDropdown = () => {
    setSortOpen((prev) => !prev);
  };

  const handleSortOption = (option) => {
    setSortOption(option);
    setSortOpen(false);
    // Implement sort functionality here based on option
    if (option === "Price: Low to High") {
      products.sort((a, b) => a.new_price - b.new_price);
    } else if (option === "Price: High to Low") {
      products.sort((a, b) => b.new_price - a.new_price);
    }
  };

  return (
    <div className="md:max-w-screen-xl sm:max-w-screen-lg max-w-screen-md items-center justify-center mx-auto sm:px-10 p-4 h-full md:mb-10 sm:mb-10 mb-12 min-h-full">
      <img src={props.banner} alt="banner image" className="mb-4" />
      <div className="flex justify-between items-center p-4">
        <p>
          <span>Showing 1-12</span> out of {products.length} products
        </p>
        <div className="relative">
          <div
            onClick={toggleSortDropdown}
            className="rounded-full p-1 px-4 text-sm flex border-2 border-black items-center justify-center hover:scale-110 duration-500 hover:bg-black hover:text-white cursor-pointer min-w-fit"
          >
            {sortOption}
            <IoMdArrowDropdownCircle className="m-auto w-7 h-7 pl-1 text-center" />
          </div>
          {sortOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <ul>
                <li
                  onClick={() => handleSortOption("Price: Low to High")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Price: Low to High
                </li>
                <li
                  onClick={() => handleSortOption("Price: High to Low")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Price: High to Low
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item, i) => {
            if (item.category === props.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div className="text-center p-4">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
