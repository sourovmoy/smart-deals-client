import React from "react";
import { useLoaderData } from "react-router";
import ProductsCard from "../Components/ProductCard/ProductsCard";
import Container from "../Components/Container/Container";

const AllProducts = () => {
  const products = useLoaderData();

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-5 sm:mt-16 mb-5">
        All <span className="text-primary">Products</span>
      </h1>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {products.map((product) => {
            return (
              <ProductsCard key={product._id} product={product}></ProductsCard>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
