import React, { useState } from "react";
import { Link } from "react-router";
import ProductsCard from "../ProductCard/ProductsCard";
import useAxioInstance from "../../Hooks/useAxioInstance";

const RecentProducts = () => {
  const [recentProduct, setRecentProduct] = useState([]);
  const axios = useAxioInstance();
  // const recentProduct = use(recentProductsPromise);
  axios.get("/recent-products").then((res) => setRecentProduct(res.data));
  return (
    <div>
      <h2 className="text-center text-4xl font-semibold my-6 sm:my-12 ">
        Recent <span className="text-primary">Products</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentProduct.map((product) => {
          return (
            <ProductsCard key={product._id} product={product}></ProductsCard>
          );
        })}
      </div>
      <div className="flex justify-center mt-3">
        <Link
          to={"/products"}
          className="btn border-none text-white bg-linear-to-l from-[#9F62F2] to-[#632EE3] hover:scale-102 hover:shadow-lg duration-300"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default RecentProducts;
