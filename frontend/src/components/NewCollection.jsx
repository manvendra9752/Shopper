import React, { useEffect, useState } from "react";
// import new_collections from "../images/Assets/new_collections";
import Item from "./Item";

const NewCollection = () => {
  const [new_collections, setnew_collections] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((res) => res.json())
      .then((data) => setnew_collections(data.newCollection));
  }, []);
  return (
    <div className="md:max-w-screen-xl sm:max-w-screen-lg max-w-screen-md items-center justify-center mx-auto sm:px-10 p-4 h-full  md:mb-20 sm:mb-16 mb-12 min-h-full ">
      <h1 className="md:text-2xl sm:text-3xl text-2xl mt-20 mx-auto text-center uppercase">
        New Collections
      </h1>
      <div className="w-40 h-1 bg-black rounded-full text-black mb-20 mt-2 mx-auto"></div>

      <div class="grid grid-cols-1 min-410px:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {new_collections.map((item, i) => {
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
        })}
      </div>
    </div>
  );
};

export default NewCollection;
