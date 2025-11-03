import React from "react";
import left from "../../assets/bg-hero-left.png";
import right from "../../assets/bg-hero-right.png";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-linear-to-l from-[#E0F8F5] to-[#FFE6FD] flex justify-between items-center relative">
      <div className="z-10">
        <img src={left} alt="" />
      </div>
      <div className="text-center z-20 ">
        <h1 className="text-2xl sm:text-7xl font-semibold mb-3 sm:mb-8">
          Deal your <span className="text-primary">Products</span> in a{" "}
          <span className="text-primary">Smart</span> way !
        </h1>
        <p className="text-base-200 mb-3 sm:mb-8">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>
        <div className="items-center">
          <input
            type="text"
            placeholder="search For Products, Categoriees..."
            className="input rounded-l-full border-r-none w-auto sm:w-[40vw] mb-3 sm:mb-3"
          />
          <button className="btn btn-md absolute b-5 rounded-r-full border-r-none text-white bg-linear-to-l from-[#9F62F2] to-[#632EE3]">
            <FaSearch />
          </button>
        </div>
        <div className="space-x-2">
          <Link
            to={"/my-products"}
            className="btn text-white bg-linear-to-l from-[#9F62F2] to-[#632EE3] hover:scale-102 hover:shadow-lg duration-300"
          >
            Watch All Products
          </Link>
          <Link
            to={"/create-products"}
            className="btn bg-white border-[#632EE3] outline-2 outline-[#632EE3] text-[#632EE3] my-3 hover:scale-102 hover:shadow-lg duration-300"
          >
            Post an Product
          </Link>
        </div>
      </div>
      <div className="z-10">
        <img src={right} alt="" />
      </div>
    </div>
  );
};

export default Banner;
