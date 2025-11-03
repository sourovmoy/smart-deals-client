import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";
import Container from "../Components/Container/Container";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <header>
        <Navbar />
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
