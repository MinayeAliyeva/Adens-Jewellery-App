import { Select } from "antd";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import FlagIcon from "./FlagIcon";

const { Option } = Select;

export const LanguageComponent = memo(() => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n
      .changeLanguage(lng)
      .then(() => {
        console.log(`Language changed to: ${lng}`);
      })
      .catch((error) => {
        console.error("Language change error:", error);
      });
  };

  return (
    <Select
      value={i18n.language}
      style={{
        width: 120,
        border: "1px solid #d9d9d9",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
      onChange={changeLanguage}
      dropdownStyle={{
        border: "none",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
      dropdownMatchSelectWidth={false}
    >
      <Option value="tr">
        <FlagIcon code="TR" style={{ marginRight: "8px" }} /> {t("Türkçe")}
      </Option>
      <Option value="en">
        <FlagIcon code="US" style={{ marginRight: "8px" }} /> {t("English")}
      </Option>
    </Select>
  );
});
