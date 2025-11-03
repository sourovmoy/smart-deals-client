import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import { ThreeDot } from "react-loading-indicators";

const Navbar = () => {
  const { user, loader, signOutFunc } = useContext(AuthContext);

  const links = (
    <>
      <li className="font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="font-semibold">
        <NavLink to="/products">All Products</NavLink>
      </li>
      {user && (
        <>
          <li className="font-semibold">
            <NavLink to="/my-products">My Products</NavLink>
          </li>
          <li className="font-semibold">
            <NavLink to="/my-bits">My Bids</NavLink>
          </li>
          <li className="font-semibold">
            <NavLink to="/create-products">Create Product</NavLink>
          </li>
          <li className="font-semibold">
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      )}
    </>
  );

  const handelSignOut = () => {
    signOutFunc()
      .then(() => {
        toast.success("SignOut Successfully");
      })
      .catch();
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-4 sm:px-10 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="normal-case text-xl sm:text-3xl font-bold">
            Smart<span className="text-primary">Deals</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {loader ? (
            <div>
              <ThreeDot color="#9F62F2" size="small" text="" textColor="" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handelSignOut}
                className="btn border-none text-white bg-linear-to-l from-[#9F62F2] to-[#632EE3] hover:scale-102 hover:shadow-lg duration-300"
              >
                Sign Out
              </button>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <img
                    className="h-11 w-11 rounded-full outline-3 outline-[#9F62F2]"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <p>{user?.displayName}</p>
                  </li>
                  <li>
                    <p>{user?.email}</p>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link
                to={"/auth/login"}
                className="btn border-none text-white bg-linear-to-l from-[#9F62F2] to-[#632EE3]  hover:scale-102 hover:shadow-lg duration-300"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
