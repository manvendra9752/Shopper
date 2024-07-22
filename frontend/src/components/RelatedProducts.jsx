import React, { useState } from "react";
import data_product from "../images/Assets/data";
import Item from "./Item";
const RelatedProducts = () => {
  // const [data_product, setAll_products] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:4000/relatedProducts")
  //     .then((response) => response.json())
  //     .then((data) => setAll_products(data));
  // }, []);
  return (
    <div>
      <h1 className="md:text-2xl sm:text-3xl text-2xl mt-20 mx-auto text-center uppercase">
        Related Products
      </h1>
      <div className="w-40 h-1 bg-black rounded-full text-black mb-20 mt-2 mx-auto"></div>

      <div class="grid grid-cols-1 min-410px:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {data_product.map((item, i) => {
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

export default RelatedProducts;
