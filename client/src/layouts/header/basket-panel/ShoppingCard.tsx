import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { iconStyle } from "../constants";
import ShoppingPanel from "./ShoppingPanel";

const ShoppingCart = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const onClose = () => {
    setIsDrawerVisible(false);
  };

  return (
    <>
      <ShoppingCartOutlined style={iconStyle} onClick={showDrawer} />
      <ShoppingPanel onClose={onClose} isDrawerVisible={isDrawerVisible} />
    </>
  );
};

export default ShoppingCart;
