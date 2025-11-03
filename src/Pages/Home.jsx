import React, { Suspense } from "react";
import Banner from "../Components/Banner/Banner";
import Container from "../Components/Container/Container";
import RecentProducts from "../Components/RecentsProducts/RecentProducts";
import { Commet } from "react-loading-indicators";

const recentProductsPromise = fetch(
  "http://localhost:3000/recent-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <Container>
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
          <RecentProducts
            recentProductsPromise={recentProductsPromise}
          ></RecentProducts>
        </Suspense>
      </Container>
    </div>
  );
};

export default Home;
