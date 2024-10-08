import { useState } from "react";
import CatagoriesSlider from "./CatagoriesSlider";
import MenuBar from "./MenuBar";
import Layout, { Content } from "antd/es/layout/layout";
import { Input, Typography } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

const Shop = () => {
  return (
    <>
      <CatagoriesSlider />

      <Content style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "20px" }}>
        <MenuBar />
        <Content style={{ flexGrow: 1,padding:'10px',marginTop:'50px' }}>
        <Input style={{width:'500px'}} size="large" placeholder="Seach Product..." prefix={<SearchOutlined />} />
          {/* <Typography>Shop Page Content</Typography>
          <Typography >
            This is where you can add additional content next to the MenuBar, such as product listings, descriptions, etc.
          </Typography> */}
        </Content>
      </Content>
    </>
  );
};

export default Shop;
