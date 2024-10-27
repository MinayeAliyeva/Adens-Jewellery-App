import { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { iconStyle } from "../constants";
import { HeartOutlined } from "@ant-design/icons";
import { useGetFavoriteByUserIdQuery } from "../../../redux/api/favorite/favorite-api";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { getUserFavoriteProductCountSelector } from "../../../redux/store";
import BadgeComponent from "../../../shared/components/BadgeComponent";
import ModalComponent from "../../../shared/components/Modal";

const FavoriteIcon = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = getUserFromToken();
  const { data: favoriteData } = useGetFavoriteByUserIdQuery(
    { userId: userData?._id ?? "" },
    { skip: !userData?._id }
  );
  const count = useSelector(getUserFavoriteProductCountSelector);
  const favoriteDataCount = isEmpty(userData)
    ? 0
    : count || favoriteData?.products?.length || 0;
  const onCheckingUserAuth = () => {
    if (!userData?._id) {
      setIsModalOpen(true);
      return;
    }
    navigate("/favorite");
  };
  return (
    <>
      <BadgeComponent count={favoriteDataCount}>
        <HeartOutlined style={iconStyle} onClick={onCheckingUserAuth} />
      </BadgeComponent>

      <ModalComponent
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default FavoriteIcon;
