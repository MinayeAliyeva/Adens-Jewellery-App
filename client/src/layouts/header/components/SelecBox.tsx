import { Select } from "antd";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const SelecBox = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
      .then(() => {
        console.log(`Language changed to: ${lng}`);
      })
      .catch((error) => {
        console.error("Language change error:", error);
      });
  };

  return (
    <Select
      value={i18n.language} // Güncel dili ayarlıyoruz
      style={{ width: 120 }}
      onChange={changeLanguage}
      dropdownStyle={{ border: "none" }}
    >
      <Option value="tr">{t('Türkçe')}</Option>
      <Option value="en">{t('English')}</Option>
    </Select>
  );
};

export default memo(SelecBox);
