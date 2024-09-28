import XCarusel from "../../shared/components/XCarusel";
import Brends from "./Brends";
import Info from "./Info";
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
