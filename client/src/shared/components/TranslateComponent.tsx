
import i18n from "../../utils/i18n";
import ButtonComponent from "./form-components/ButtonComponent";

const az = "/assets/images/az.svg";
const en = "/assets/images/eng.svg";

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
          width: 34,
          height: 34,
          marginLeft: "20px",
          backgroundImage: `url(${az})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "50%",
        }}
      />
      <ButtonComponent
        type="text"
        onClick={() => changeLanguage("en")}
        style={{
          fontSize: "16px",
          width: 34,
          height: 34,
          backgroundImage: `url(${en})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default TranslateComponent;
