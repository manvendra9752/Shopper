import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInfo = async () => {
    setLoading(true);
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
        setLoading(false);
      });
  };

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json());

    setAllProducts(allProducts.filter((product) => product.id !== id));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="min-w-fit w-3/4 mx-auto px-4 py-2 max-h-full overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 w-full text-center">
        Product List
      </h2>
      <div className="max-h-screen-3/4 overflow-auto">
        <table className="w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Offer Price
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {allProducts.map((product) => (
              <tr
                key={product.id}
                className="text-sm sm:text-base hover:bg-gray-100 transition"
              >
                <td className="px-2 py-2 sm:px-4 sm:py-4">
                  <img
                    src={product.image}
                    alt="product"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                  />
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-4 whitespace-nowrap">
                  {product.name}
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-4 text-gray-800">
                  ${product.new_price.toFixed(2)}
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-4 text-gray-800">
                  ${product.old_price.toFixed(2)}
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-4 text-gray-800">
                  {product.category}
                </td>
                <td
                  className="px-2 py-2 sm:px-4 sm:py-4 whitespace-nowrap text-red-600 cursor-pointer text-center"
                  onClick={() => removeProduct(product.id)}
                >
                  <RxCross2 className="text-red-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
