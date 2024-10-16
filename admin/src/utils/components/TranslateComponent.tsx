import i18n from "../i18n";
import { ButtonComponent } from "./ButtonComponent";
const az = "/assets/images/az.svg";
const en = "/assets/images/en.svg";

const changeLanguage = (lng: string) => {
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
