import { Layout, Typography } from "antd";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Content } from "antd/es/layout/layout";
import UserFavoriteProduct from "./UserFavoriteProduct";
import { useLazyGetFavoriteByUserIdQuery } from "../../redux/api/favorite/favorite-api";
import { getUserFavoriteProductCountSelector } from "../../redux/store";
import { SpinComponent } from "../../components/SpinComponent";
const backgroundFavorite = "/assets/images/bg-favorite.jpg";

const Favorite = () => {
  const userData = getUserFromToken();
  const [
    getUserFavoriteData,
    { data: userFavoriteDate, isFetching: isFetchingUserFavorite },
  ] = useLazyGetFavoriteByUserIdQuery();

  const favoriteCount = useSelector(getUserFavoriteProductCountSelector);

  useEffect(() => {
    if (userData?._id) {
      getUserFavoriteData({ userId: userData?._id ?? "" });
    }
  }, [userData?._id, favoriteCount]);

  return (
    <>
      <Layout
        style={{
          backgroundImage: `url(${backgroundFavorite})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      </Layout>
      <Layout>
        {isEmpty(userFavoriteDate?.products) ? (
          <Typography.Title
            level={2}
            style={{
              textAlign: "center",
              marginTop: "260px",
              minHeight: "100vh",
            }}
          >
            Sevimlilerde mehsul yoxdur
          </Typography.Title>
        ) : (
          <Content style={{ minHeight: "100vh" }}>
            <SpinComponent loading={isFetchingUserFavorite}>
              {userFavoriteDate?.products?.map((product) => {
                return (
                  <UserFavoriteProduct
                    product={product.productId}
                    key={product.productId?._id}
                  />
                );
              })}
            </SpinComponent>
          </Content>
        )}
      </Layout>
    </>
  );
};

export default Favorite;
