import { Layout } from "antd";
const backgroundImage = "/assets/images/bg-favorite.jpg";

const CatagoriesSlider = () => {
  return (
    <Layout
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "40vh",
      }}
    ></Layout>
  );
};

export default CatagoriesSlider;
