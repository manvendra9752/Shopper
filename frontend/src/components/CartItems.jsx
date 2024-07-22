import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { RxCross2 } from "react-icons/rx";

const CartItems = () => {
  const { all_product, removeFromCart, cartItems, getTotalCartAmount } =
    useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(getTotalCartAmount());
  }, [cartItems]);

  const hasItemsInCart = all_product.some((e) => cartItems[e.id] > 0);

  return (
    <div className="container mx-auto p-4 min-h-full flex flex-col">
      {hasItemsInCart && (
        <table className="w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-slate-800">
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
                Quantity
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-400 divide-y divide-gray-200">
            {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <tr key={e.id} className="text-sm sm:text-base">
                    <td className="px-2 py-2 sm:px-4 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <img
                          src={e.image}
                          alt="product"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-4 text-gray-800">
                      {e.name}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-4 text-gray-800">
                      ${e.new_price.toFixed(2)}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-4 text-center text-gray-800">
                      <span className="bg-gray-200 px-2 py-1 rounded-lg">
                        {cartItems[e.id]}
                      </span>
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-4 text-gray-800">
                      ${(e.new_price * cartItems[e.id]).toFixed(2)}
                    </td>
                    <td
                      className="px-2 py-2 sm:px-4 sm:py-4 whitespace-nowrap text-red-600 cursor-pointer text-center"
                      onClick={() => removeFromCart(e.id)}
                    >
                      <RxCross2 className="w-full text-center text-red-800 text-2xl" />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      )}

      {!hasItemsInCart && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
        </div>
      )}

      <div
        className={`flex flex-col md:flex-row items-center justify-between p-4 w-full mt-16 ${
          !hasItemsInCart && "mt-auto"
        }`}
      >
        <div className="md:w-2/3 w-full p-4 border rounded-md shadow-md mb-4 md:mb-0">
          <h1 className="font-bold text-xl sm:text-2xl mb-4">Cart Total</h1>
          <div className="flex items-center justify-between mb-2">
            <p>Subtotal</p>
            <p>${totalAmount.toFixed(2)}</p>
          </div>
          <hr />
          <div className="flex items-center justify-between mb-2 mt-2">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="flex items-center justify-between font-semibold mb-2 mt-2">
            <p>Total</p>
            <p>${totalAmount.toFixed(2)}</p>
          </div>
          <hr />
          <button className="w-full bg-red-600 text-white py-2 mt-4 rounded-md hover:bg-red-700 transition duration-200">
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="md:w-1/3 w-full text-center p-4 border rounded-md shadow-md">
          <p className="mb-4">If you have a promo code, enter it here</p>
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="border-2 border-black px-4 py-2 mr-2 rounded-md"
              placeholder="Enter your promo code..."
            />
            <button className="bg-red-600 text-white py-2 px-2 rounded-md hover:bg-red-700 transition duration-200">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
