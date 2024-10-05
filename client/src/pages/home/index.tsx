import XCarusel from "../../shared/components/XCarusel";
import Brends from "./components/Brends";
import Info from "./Perfection";
import Products from "./Products";
import Testiminal from "./testiminal/Testiminal";

const Home = () => {
  return (
    <>
      <XCarusel />
      <Products />
      <Brends />
      <Testiminal />
      <Info />
    </>
  );
};

export default Home;
