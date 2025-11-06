import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import useInfo from "../Hooks/useInfo";
import Swal from "sweetalert2";

const CreateProducts = () => {
  // const { user } = useContext(AuthContext);
  const { user } = useInfo();
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const price_min = Number(e.target.minPrice.value);
    const price_max = Number(e.target.maxPrice.value);
    const email = e.target.sellerEmail.value;
    const category = e.target.category.value;
    const created_at = new Date().toISOString();
    const image = e.target.image.value;
    const status = "pending";
    const location = e.target.location.value;
    const seller_image = e.target.sellerImage.value;
    const seller_name = e.target.sellerName.value;
    const condition = e.target.condition.value;
    const usage = e.target.usageTime.value;
    const description = e.target.description.value;
    const sellerContact = e.target.sellerContact.value;

    const newProducts = {
      title,
      price_min,
      price_max,
      email,
      category,
      created_at,
      image,
      status,
      location,
      seller_image,
      seller_name,
      condition,
      usage,
      description,
      sellerContact,
    };
    axios.post("http://localhost:3000/products", newProducts).then((data) => {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

      e.target.reset();
      console.log(data.data);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Create A Product
        </h2>

        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Product's name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-600 mb-1">Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Select a Category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="vehicles">Vehicles</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">
              Min Price you want to Sale (Taka)
            </label>
            <input
              type="number"
              name="minPrice"
              placeholder="Min price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">
              Max Price you want to Sale (Taka)
            </label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Product Condition & Usage */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">
              Product Condition
            </label>
            <div className="flex items-center gap-4 mt-1">
              <label className="flex items-center gap-1">
                <input type="radio" name="condition" value="brand new" />
                <span>Brand New</span>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="condition" value="used" />
                <span>Used</span>
              </label>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">
              Product Usage time
            </label>
            <input
              type="text"
              name="usageTime"
              placeholder="e.g. 1 year 3 month"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Image URLs */}
        <div>
          <label className="block text-gray-600 mb-1">
            Your Product Image URL
          </label>
          <input
            type="url"
            name="image"
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Seller Info */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-600 mb-1">Seller Name</label>
            <input
              type="text"
              name="sellerName"
              readOnly
              defaultValue={user?.displayName}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Seller Email</label>
            <input
              type="email"
              name="sellerEmail"
              readOnly
              defaultValue={user?.email}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Seller Contact</label>
            <input
              type="text"
              name="sellerContact"
              placeholder="+1-555-1234"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Seller Image URL</label>
            <input
              type="url"
              name="sellerImage"
              readOnly
              defaultValue={user?.photoURL}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-600 mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="City, Country"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-1">
            Simple Description about your Product
          </label>
          <textarea
            name="description"
            placeholder="e.g. I bought this product 3 month ago..."
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg transition-all"
        >
          Create A Product
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;
