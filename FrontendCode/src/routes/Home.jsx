import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbarhome from "../components/Navbar";

// import Navbarhome from '../components/anth-comp/Navbar-home';
import Footers from '../components/Footer'


import { useEffect, useState } from "react";
import Loader from "./page/Loader";

function HomePage() {

  const [isNavbarSticky, setIsNavbarSticky] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsNavbarSticky(offset > 0); // You can adjust this condition based on when you want the Navbar to become sticky
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDataLoadedBefore = localStorage.getItem("isDataLoaded") === "true";

  const [isLoading, setIsLoading] = useState(!isDataLoadedBefore);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("isDataLoaded", "true");
      }, 2000);
    };

    if (isLoading) {
      fakeDataFetch();
    }
  }, [isLoading]); 

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {/* <Footer/>  */}
      <Hero/>
      <Navbarhome isNavbarSticky={isNavbarSticky} />
      <Footers/>

    </>
  );
}

export default HomePage;
