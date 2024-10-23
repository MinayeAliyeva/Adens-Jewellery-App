import { useSelector } from "react-redux";
import BadgeComponent from "../../../components/BadgeComponent";
import { useNavigate } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { iconStyle } from "../constants";
import { useGetFavoriteByUserIdQuery } from "../../../redux/api/favorite/favorite-api";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { getUserFavoriteProductCountSelector } from "../../../redux/store";
import { isEmpty } from "lodash";
import { Modal, Typography } from "antd";
import ButtonComponent from "../../../components/form-components/ButtonComponent";
import { useState } from "react";

const FavoriteIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userData = getUserFromToken();
  const { data: favoriteData } = useGetFavoriteByUserIdQuery(
    { userId: userData?._id ?? "" },
    { skip: !userData?._id }
  );
  const count = useSelector(getUserFavoriteProductCountSelector);
  const favoriteDataCount = isEmpty(userData)
    ? 0
    : count || favoriteData?.products?.length || 0;

  const onModalCancle = () => {
    setIsModalOpen(false);
  };
  const onLogin = () => {
    setIsModalOpen(false);
    navigate("/login");
  };
  const goFavoritePage = () => {
    if (isEmpty(userData)) {
      setIsModalOpen(true);
      return;
    }
    navigate("/favorite");
  };

  return (
    <>
      <BadgeComponent count={favoriteDataCount}>
        <HeartOutlined style={iconStyle} onClick={goFavoritePage} />
      </BadgeComponent>
      <Modal
        title="ilk once login olmaniz gerekir"
        open={isModalOpen}
        onCancel={onModalCancle}
        footer={null}
      >
        <Typography.Title></Typography.Title>
        <ButtonComponent onClick={onLogin} buttonText="Login seyfesine get" />
      </Modal>
    </>
  );
};

export default FavoriteIcon;
