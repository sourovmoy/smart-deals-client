import React, { Suspense } from "react";
import Banner from "../Components/Banner/Banner";
import Container from "../Components/Container/Container";
import RecentProducts from "../Components/RecentsProducts/RecentProducts";
import { Commet } from "react-loading-indicators";

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
          <RecentProducts></RecentProducts>
        </Suspense>
      </Container>
    </div>
  );
};

export default Home;
