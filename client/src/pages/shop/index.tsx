import CatagoriesSlider from "./CatagoriesSlider";
import MenuBar from "./MenuBar";
import  { Content } from "antd/es/layout/layout";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Shop = () => {
  return (
    <>
      <CatagoriesSlider />

      <Content
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          padding: "20px",
        }}
      >
        <MenuBar />
        <Content style={{ flexGrow: 1, padding: "10px", marginTop: "50px" }}>
          <Input
            style={{ width: "500px" }}
            size="large"
            placeholder="Seach Product..."
            prefix={<SearchOutlined />}
          />
        </Content>
      </Content>
    </>
  );
};

export default Shop;
