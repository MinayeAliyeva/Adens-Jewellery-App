// SettingsSidebar.js
import { Drawer, Button, Typography, Divider, Switch, Space } from "antd";
import { FC, useState, useEffect } from "react";
import { LanguageComponent } from "./header/components";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

interface ISettingsSidebarProps {
  onClose?: () => void;
  isVisible?: boolean;
  onColorChange?: (color: string) => void;
  onLanguageChange?: (language: string) => void;
}

const SettingsSidebar: FC<ISettingsSidebarProps> = ({
  onClose,
  isVisible,
  onColorChange,
  onLanguageChange,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
    document.body.setAttribute("data-theme", checked ? "dark" : "light");
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Drawer
      title="Ayarlar"
      placement="right"
      onClose={onClose}
      visible={isVisible}
      width={350}
      bodyStyle={{ padding: "20px", backgroundColor: isDarkMode ? "#1a1a1a" : "#fff" }}
      headerStyle={{ backgroundColor: isDarkMode ? "#333" : "#f0f0f0", color: isDarkMode ? "#fff" : "#000" }}
    >
      <Typography.Title level={4} style={{ marginBottom: 0 }}>Dil Seçimi</Typography.Title>
      <LanguageComponent />
      <Divider />

      <Typography.Title level={4} style={{ marginBottom: 0 }}>Tema Modu</Typography.Title>
      <Space style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: '18px', color: isDarkMode ? "#fff" : "#000" }}>
          {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        </span>
        <Switch checked={isDarkMode} onChange={toggleDarkMode} />
      </Space>
      <Divider />

      <Typography.Title level={4} style={{ marginBottom: 0 }}>Diğer Ayarlar</Typography.Title>
      {/* Burada diğer ayar bileşenlerini ekleyebilirsiniz */}
      <Divider />

      <Button
        type="primary"
        onClick={onClose}
        style={{ marginTop: "20px", width: "100%" }}
      >
        Değişiklikleri Kaydet
      </Button>
    </Drawer>
  );
};

export default SettingsSidebar;
