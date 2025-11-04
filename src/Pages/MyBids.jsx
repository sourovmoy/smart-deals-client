import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Container from "../Components/Container/Container";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user: data } = useContext(AuthContext);

  const [myBids, setMyBids] = useState([]);
  useEffect(() => {
    if (data?.email) {
      fetch(`http://localhost:3000/myBids?email=${data.email}`, {
        headers: {
          authorization: `Bearer ${data.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMyBids(data);
        });
    }
  }, [data]);

  const handelRemoveBits = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            const remainingBids = myBids.filter((bid) => bid._id !== id);
            setMyBids(remainingBids);
          });
      }
    });
  };
  return (
    <div>
      <div>
        <Container>
          <div>
            <h1 className="text-4xl font-bold text-center mt-10 mb-5">
              {" "}
              My Bids: <span className="text-primary">{myBids.length}</span>
            </h1>
            <div className="bg-white shadow-md rounded-2xl p-4 overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm">
                      <th className="text-left py-3 px-4 font-medium">SL No</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Product
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Seller
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Bid Price
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {myBids.map((offer, index) => {
                      return (
                        <tr
                          key={offer._id}
                          className="border-b hover:bg-gray-50 transition text-sm text-gray-700"
                        >
                          <td className="py-3 px-4">{index + 1}</td>

                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={data.image}
                              alt={data.title}
                              className="w-10 h-10 object-cover rounded-md border"
                            />
                            <div>
                              <p className="font-medium">{data.title}</p>
                              <p className="text-xs text-gray-500">
                                ৳{data.price_max}
                              </p>
                            </div>
                          </td>

                          <td className="py-3 px-4 font-semibold text-gray-800 ">
                            <div className="flex gap-2">
                              <img
                                src={offer.buyer_image}
                                alt={offer.buyer_name}
                                className="w-10 h-10 object-cover rounded-full border"
                              />
                              <div>
                                <p className="font-medium">
                                  {offer.buyer_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {offer.buyer_email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 flex items-center gap-3">
                            ৳{offer.bid_price}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <div className="badge badge-warning">
                                {offer.status}
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handelRemoveBits(offer._id)}
                                className="px-3 py-1 text-sm text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition"
                              >
                                Remove Bid
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {myBids.map((offer, index) => (
                  <div
                    key={offer._id}
                    className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500 font-medium">
                        SL No: {index + 1}
                      </span>
                      <div className="badge badge-warning">{offer.status}</div>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={data.image}
                        alt={data.title}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                      <div>
                        <p className="font-semibold">{data.title}</p>
                        <p className="text-xs text-gray-500">
                          ৳{offer.bid_price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={offer.buyer_image}
                        alt={offer.seller_name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-medium">{offer.seller_name}</p>
                        <p className="text-xs text-gray-500">
                          {offer.buyer_email}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-700">
                        ৳{offer.bid_price}
                      </span>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 text-sm text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition">
                        Remove Bid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MyBids;
