import { useTranslation } from "react-i18next";
import CaruselComponent from "../../shared/components/CaruselComponent";
import Brends from "./components/Brends";
import Info from "./Perfection";
import Products from "./Products";
import Testiminal from "./testiminal/Testiminal";

const Home = () => {
  const { t } = useTranslation();
  //! SHOW ERRORS
  // throw Error("")
  return (
    <>
      <CaruselComponent t={t} />
      <Products />
      <Brends />
      <Testiminal />
      <Info />
    </>
  );
};

export default Home;
