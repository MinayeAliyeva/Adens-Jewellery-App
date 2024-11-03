import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { iconStyle } from "../constants";
import ShoppingPanel from "./ShoppingPanel";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { useSelector } from "react-redux";
import { getUserBasketProductCountSelector } from "../../../redux/store";
import { useLazyGetBasketByUserIdQuery } from "../../../redux/api/basket/basket-api";
import { isEmpty } from "lodash";
import ModalComponent from "../../../shared/components/Modal";
import BadgeComponent from "../../../shared/components/BadgeComponent";

const ShoppingCart = () => {
  const userData = getUserFromToken();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const count = useSelector(getUserBasketProductCountSelector);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [getBasketByUserId,{ data: basketData } ]= useLazyGetBasketByUserIdQuery();
  useEffect(() => {
    if(userData?._id && count === 0){
      getBasketByUserId({
        id: userData?._id})
    }
  },[count, userData?._id])

  const showDrawer = () => {
    if (userData?._id) {
      setIsDrawerVisible(true);
    } else {
      setIsModalOpen(true);
    }
  };
  const onClose = () => {
    setIsDrawerVisible(false);
  };
  const basketDataCount = isEmpty(userData)
    ? 0
    : count || basketData?.products?.length || 0;

  return (
    <>
      <BadgeComponent count={basketDataCount}>
        <ShoppingCartOutlined style={iconStyle} onClick={showDrawer} />
      </BadgeComponent>

      {userData?._id && (
        <ShoppingPanel onClose={onClose} isDrawerVisible={isDrawerVisible} />
      )}
      <ModalComponent
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default ShoppingCart;
