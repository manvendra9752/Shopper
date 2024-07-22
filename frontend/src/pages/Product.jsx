import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrum";
import ProductDisplay from "../components/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find(
    (product) => product.id === Number(productId)
  );

  if (!product) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-xl font-semibold">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts productId={product.id} />
    </div>
  );
};

export default Product;
