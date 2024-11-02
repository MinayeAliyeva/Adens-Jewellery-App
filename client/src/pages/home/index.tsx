import CaruselComponent from "../../shared/components/CaruselComponent";
import Brends from "./components/Brends";
import Info from "./Perfection";
import Products from "./Products";
import Testiminal from "./testiminal/Testiminal";

const Home = () => {
  //! SHOW ERRORS
  // throw Error("")
  return (
    <>
      <CaruselComponent />
      <Products />
      <Brends />
      <Testiminal />
      <Info />
    </>
  );
};

export default Home;
