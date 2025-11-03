import { createBrowserRouter } from "react-router";
import HomePage from "../LayOut/HomePage";
import Login from "../Pages/Login";
import AuthLayout from "../LayOut/AuthLayout";
import Register from "../Pages/Register";
import AllProducts from "../Pages/AllProducts";
import ProductDetails from "../Pages/ProductDetails";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";
import CreateProducts from "../Pages/CreateProducts";
import Profiles from "../Pages/Profiles";
import Error from "../Pages/Error";
import MainError from "../Pages/MainError";
import Loading from "../Components/Loading/Loading";
import PrivetRouter from "../PrivetRouter/PrivetRouter";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    hydrateFallbackElement: <Loading />,
    errorElement: <MainError />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/products",
        Component: AllProducts,
        loader: () => fetch("http://localhost:3000/products"),
      },
      {
        path: "/products/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        element: (
          <PrivetRouter>
            <ProductDetails />
          </PrivetRouter>
        ),
      },
      {
        path: "/my-products",
        element: (
          <PrivetRouter>
            <MyProducts />
          </PrivetRouter>
        ),
      },
      {
        path: "/my-bits",
        element: (
          <PrivetRouter>
            <MyBids />
          </PrivetRouter>
        ),
      },
      {
        path: "/create-products",
        element: (
          <PrivetRouter>
            <CreateProducts />
          </PrivetRouter>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);
