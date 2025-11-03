import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import ProductBids from "../Components/ProductBids/ProductBids";
import { Commet } from "react-loading-indicators";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${data._id}`)
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [data]);

  const bidModalRef = useRef(null);

  const handelButton = () => {
    bidModalRef.current.showModal();
  };

  const submitFrom = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const price = e.target.bid_Price.value;
    const contact = e.target.contact_number.value;

    const newBids = {
      product: data._id,
      buyer_image: photoURL,
      buyer_name: name,
      buyer_contact: contact,
      buyer_email: email,
      bid_price: price,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBids),
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        if (data.insertedId) {
          toast.success("Your price is sent to the seller");
          bidModalRef.current.close();
          newBids._id = data.insertedId;

          setBids([...bids, newBids].sort((a, b) => b.bid_price - a.bid_price));
        }
      });
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 text-gray-800 font-sans">
        <Link
          to={"/products"}
          className="text-sm text-gray-500 hover:text-gray-800 flex items-center mb-4"
        >
          ← Back To Products
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-64 sm:h-80 object-cover rounded-xl mb-4"
            />
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Product Description
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <p>
                  <span className="font-semibold text-primary ">
                    Condition:
                  </span>{" "}
                  <span className="text-blue-600 capitalize">
                    {data.condition}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-primary ">
                    Usage Time:
                  </span>{" "}
                  {data.usage}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold mb-1">
                {data.title}
              </h1>
              <p className="text-sm text-gray-500 mb-3">
                Category: {data.category}
              </p>

              <div className="text-green-600 text-xl font-semibold mb-4">
                ৳{data.price_min} - ৳{data.price_max}
                <p className="text-sm text-gray-500">Price starts from</p>
              </div>

              <div className="mb-4 border-t border-gray-200 pt-3">
                <h3 className="text-base font-semibold mb-2">
                  Product Details
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Product ID:</span>{" "}
                  {data._id}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Posted:</span>{" "}
                  {new Date(data.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-base font-semibold mb-2">
                  Seller Information
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={data.seller_image}
                    alt={data.seller_name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {data.seller_name}
                    </p>
                    <p className="text-sm text-gray-500">{data.email}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Location:</span>{" "}
                  {data.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Contact:</span>{" "}
                  {data.seller_contact}
                </p>
                <p className="text-sm mt-1 font-medium">
                  Status:
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                      data.status === "pending"
                        ? "text-yellow-800 bg-yellow-100"
                        : "text-green-800 bg-green-100"
                    }`}
                  >
                    {data.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handelButton}
                className="w-full py-3 text-white bg-linear-to-l from-[#9F62F2] to-[#632EE3] hover:scale-102 hover:shadow-lg duration-300 rounded-lg"
              >
                I Want Buy This Product
              </button>

              <dialog
                ref={bidModalRef}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold text-center mb-6">
                      Give Seller Your Offered Price
                    </h2>

                    <form onSubmit={submitFrom} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Buyer Name
                          </label>
                          <input
                            name="name"
                            type="text"
                            disabled
                            defaultValue={user?.displayName}
                            placeholder="Your name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Buyer Email
                          </label>
                          <input
                            name="email"
                            disabled
                            type="email"
                            placeholder="Your Email"
                            defaultValue={user.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Buyer Image URL
                        </label>
                        <input
                          name="photoURL"
                          disabled
                          type="text"
                          defaultValue={user.photoURL}
                          placeholder="https://...your_img_url"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Place your Price
                        </label>
                        <input
                          required
                          name="bid_Price"
                          type="number"
                          placeholder="e.g. 1200"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Info
                        </label>
                        <input
                          required
                          name="contact_number"
                          type="text"
                          placeholder="e.g. +1-555-1234"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 text-white bg-linear-to-l from-[#9F62F2] to-[#632EE3] hover:scale-102 hover:shadow-lg duration-300 rounded-lg"
                      >
                        Submit Bid
                      </button>
                    </form>
                  </div>

                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn px-4 bg-white py-2 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center mt-10 items-center">
            <Commet
              color="#632EE3"
              size="large"
              text="loading"
              textColor="#632EE3"
            />
          </div>
        }
      >
        <ProductBids data={data} bids={bids}></ProductBids>
      </Suspense>
    </div>
  );
};

export default ProductDetails;
