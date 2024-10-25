import i18n from "../i18n/index";
import ButtonComponent from "./form-components/ButtonComponent";

const az = "/assets/images/az.svg";
const en = "/assets/images/eng.svg";

const changeLanguage = (lng: string) => {
  console.log("lng", lng);
  i18n.changeLanguage(lng);
};

const TranslateComponent = () => {
  return (
    <>
      <ButtonComponent
        type="text"
        onClick={() => changeLanguage("az")}
        style={{
          fontSize: "16px",
          width: 44,
          height: 44,
          marginLeft: "20px",
          backgroundImage: `url(${az})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <ButtonComponent
        type="text"
        onClick={() => changeLanguage("en")}
        style={{
          fontSize: "16px",
          width: 44,
          height: 44,
          marginLeft: "20px",
          backgroundImage: `url(${en})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </>
  );
};

export default TranslateComponent;
