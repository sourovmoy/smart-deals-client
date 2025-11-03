import React from "react";
import { Link } from "react-router";

const ProductsCard = ({ product }) => {
  return (
    <div>
      <div className="card bg-base-100 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
        <figure className="p-3">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.title} [{product.condition}]
          </h2>
          <p className="text-primary font-semibold">
            ৳{product.price_min}-৳{product.price_max}
          </p>
          <div className="card-actions justify-between items-center">
            <Link
              to={`/products/${product._id}`}
              className="btn bg-white border-[#632EE3] text-[#632EE3]  hover:scale-102 hover:shadow-lg duration-300 w-full"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
