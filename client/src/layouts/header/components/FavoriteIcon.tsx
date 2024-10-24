import { useSelector } from "react-redux";
import BadgeComponent from "../../../components/BadgeComponent";
import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { iconStyle } from "../constants";
import { useGetFavoriteByUserIdQuery } from "../../../redux/api/favorite/favorite-api";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { getUserFavoriteProductCountSelector } from "../../../redux/store";
import { isEmpty } from "lodash";

const FavoriteIcon = () => {
  const userData = getUserFromToken();
  const { data: favoriteData } = useGetFavoriteByUserIdQuery(
    { userId: userData?._id ?? "" },
    { skip: !userData?._id }
  );
  const count = useSelector(getUserFavoriteProductCountSelector);
  const favoriteDataCount = isEmpty(userData)
    ? 0
    : count || favoriteData?.products?.length || 0;
  
  return (
      <BadgeComponent count={favoriteDataCount}>
        <Link to="/favorite"> 
          <HeartOutlined style={iconStyle} />
        </Link>
      </BadgeComponent>
  );
};

export default FavoriteIcon;
