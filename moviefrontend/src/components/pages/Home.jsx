import React from "react";
import NotVerified from "../user/NotVerified";
import Navbar from "../user/Navbar";
import TopRatedMovies from "../user/TopRatedMovies";
import Container from "../Container";
import TopRatedWebSeries from "../user/TopRatedWebSeries";
import TopRatedTvSeries from "../user/TopRatedTvSeries";
import HeroSlideShow from "../user/HeroSlideShow";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="dark:bg-primary bg-white min-h-screen">
        <Container>
          <NotVerified />
          <HeroSlideShow/>
          <TopRatedMovies />
          <TopRatedWebSeries/>
          <TopRatedTvSeries />
        </Container>
      </div>
    </>
  );
};

export default Home;
