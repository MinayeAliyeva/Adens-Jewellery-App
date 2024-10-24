import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { iconStyle } from "../constants";
import ShoppingPanel from "./ShoppingPanel";
import BadgeComponent from "../../../components/BadgeComponent";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { useSelector } from "react-redux";
import { getUserBasketProductCountSelector } from "../../../redux/store";
import { useGetBasketByUserIdQuery } from "../../../redux/api/basket/basket-api";
import { isEmpty } from "lodash";
import ModalComponent from "../../../components/Modal";

const ShoppingCart = () => {
  const userData = getUserFromToken();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const count = useSelector(getUserBasketProductCountSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: basketData } = useGetBasketByUserIdQuery(
    { id: userData?._id ?? "" },
    { skip: !userData?._id }
  );

  const showDrawer = () => {
    userData?._id ? setIsDrawerVisible(true) : setIsModalOpen(true);
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
