import { Content } from "antd/es/layout/layout";
import i18n from "../i18n";
import ButtonComponent from "./form-components/ButtonComponent";
// import { ButtonComponent } from "./ButtonComponent";
const az = "/assets/images/lang-img/az.svg";
const en = "/assets/images/lang-img/en.svg";

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

const TranslateComponent = () => {
  return (
    <Content style={{marginLeft: "60px"}}>
      <ButtonComponent
        type="text"
        onClick={() => changeLanguage("az")}
        style={{
          fontSize: "16px",
          width: 24,
          height: 24,

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
          width: 24,
          height: 24,
          marginLeft: "10px",
          backgroundImage: `url(${en})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </Content>
  );
};

export default TranslateComponent;
