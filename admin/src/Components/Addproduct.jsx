import React, { useState } from "react";

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "women",
    image: "",
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const changeHandler = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let responseData;
    let product = { ...productDetails };
    let formData = new FormData();
    formData.append("product", file);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;

      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            console.log("Product added successfully:", product);
            setProductDetails({
              name: "",
              old_price: "",
              new_price: "",
              category: "men",
              image: "",
            });
            setFile(null);
          }
        });
    }
  };

  return (
    <div className="min-w-fit w-2/3 mx-auto px-4 py-2 mt-10 md:mt-0 max-h-fit overflow-none">
      <h2 className="text-2xl font-semibold mb-4 w-full text-center">
        Add Product
      </h2>
      <form className="space-y-4" onSubmit={submitHandler}>
        <div>
          <label className="block mb-1">Product Title</label>
          <input
            value={productDetails.name}
            name="name"
            onChange={changeHandler}
            type="text"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter product title"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label className="block mb-1">Price</label>
            <input
              value={productDetails.old_price}
              name="old_price"
              onChange={changeHandler}
              type="number"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block mb-1">Offer Price</label>
            <input
              value={productDetails.new_price}
              name="new_price"
              onChange={changeHandler}
              type="number"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter offer price"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <select
            value={productDetails.category}
            name="category"
            onChange={changeHandler}
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="men">Men</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Product Image</label>
          <input
            type="file"
            name="image"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
            onChange={handleFileChange}
          />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Product Preview"
              className="mt-4 w-full h-64 object-cover rounded-md"
            />
          )}
        </div>
        <button
          type="submit"
          className="min-w-fit bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
