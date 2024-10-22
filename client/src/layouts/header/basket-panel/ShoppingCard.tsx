import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { iconStyle } from "../constants";
import ShoppingPanel from "./ShoppingPanel";
import BadgeComponent from "../../../components/BadgeComponent";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { useSelector } from "react-redux";
import { getUserBasketProductCountSelector } from "../../../redux/store";
import { Modal, Typography } from "antd";
import ButtonComponent from "../../../components/form-components/ButtonComponent";
import { useGetBasketByUserIdQuery } from "../../../redux/api/basket/basket-api";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const userData = getUserFromToken();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const count= useSelector(getUserBasketProductCountSelector);
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: basketData }= useGetBasketByUserIdQuery({id: userData?._id ?? ""}, { skip: !userData?._id });  
  
  const showDrawer = () => {
    userData?._id  ? setIsDrawerVisible(true) : setIsModalOpen(true);
  };
  const onClose = () => {
    setIsDrawerVisible(false);
  };
  const basketDataCount = count > 0 ?  count : (basketData?.products?.length || 0);
  console.log({basketDataCount});
  const onModalCancle = () => {
    setIsModalOpen(false);
  };
  const onLogin = () => {
    setIsModalOpen(false);
    navigate("/login")
  }
  return (
    <>
    <BadgeComponent count={basketDataCount}>
      <ShoppingCartOutlined style={iconStyle} onClick={showDrawer} />
    </BadgeComponent>
      
      {userData?._id && <ShoppingPanel onClose={onClose} isDrawerVisible={isDrawerVisible}/>}
      <Modal title="ilk once login olmaniz gerekir" open={isModalOpen} onCancel={onModalCancle} footer={null}>
        <Typography.Title></Typography.Title>
        <ButtonComponent onClick={onLogin} buttonText="Login seyfesine get" />
      </Modal>
    </>
  );
};

export default ShoppingCart;
