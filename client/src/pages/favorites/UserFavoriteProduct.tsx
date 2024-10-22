import { FC } from "react";
import { useDispatch } from "react-redux";
import {  Image, Typography, Button } from "antd";
import { isEmpty } from "lodash";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { FaMinus } from "react-icons/fa";
import { IProduct } from "../../redux/api/product/modules";
import ButtonComponent from "../../components/form-components/ButtonComponent";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { useAddBasketMutation } from "../../redux/api/basket/basket-api";
import { setFavoriteProductCount } from "../../redux/features/favoriteProductCount";
import { showErrorToast, showSuccessToast } from "../../components/NotficationComponent";
import { useDeleteProductFromFavoriteMutation } from "../../redux/api/favorite/favorite-api";
import { useNavigate } from "react-router-dom";

interface IFavoriteListProps {
  product: IProduct;
}

const { Title, Text } = Typography;

const UserFavoriteProduct: FC<IFavoriteListProps> = ({ product }) => {
  const userData = getUserFromToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goProductDetail = () => {
    navigate(`/product/detail/${product._id}`);
  }

  const [addBasket] = useAddBasketMutation();
  const [deleteProductFromFavorite] = useDeleteProductFromFavoriteMutation();
  const addFavoriteProductInBasket = () => {
    if (!userData?._id) {
      showErrorToast("Bu ishlem ichin Uye olmaniz lazim");
      return;
    }
    addBasket({
      productId: product?._id,
      userId: userData?._id,
      quantity: 1,
    }).then((res) => {
      if (isEmpty(res?.data)) return;
      dispatch(setFavoriteProductCount(res?.data.basket?.products.length));

      if (res?.data.basket?.products.find((p) => p.quantity === 1)) {
        showSuccessToast("product sebete elave edildi");
      } else showSuccessToast("sebetedeki mehsulun miqdati  yenilendi");
    });
  };

  const onDeleteProductFromFavorite = () => {
    if (!userData?._id) {
      showErrorToast("Bu ishlem ichin Uye olmaniz lazim");
      return;
    }
    deleteProductFromFavorite({userId: userData?._id, productId: product?._id}).then((res) => {
      if (isEmpty(res?.data)) return;
      dispatch(setFavoriteProductCount(res.data?.wishList?.products?.length ?? 0));
    });
  };

  return (
    <Content style={{ padding: "20px" }}>
      <Content
        style={{
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Content style={{ display: "flex", alignItems: "center" }}>
          <Image
            style={{
              width: "120px",
              height: "120px",
              marginRight: "20px",
              borderRadius: "8px",
            }}
            src={product.mainImageUrl}
            alt={product.productName}
            preview={false}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Title level={4}>{product.productName}</Title>
            <Text type="secondary">{product.price}</Text>
            <Text type="secondary" style={{ marginTop: "5px" }}>
              {product.description}
            </Text>
            <Text type="secondary" style={{ marginTop: "5px" }}>
              Creation Date: {product.creationDate || "N/A"}
            </Text>
          </div>
        </Content>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ButtonComponent
            type="primary"
            icon={<ShoppingCartOutlined />}
            style={{ marginRight: "10px" }}
            buttonText="Sepete Ekle"
            onClick={addFavoriteProductInBasket}
          />
           
          <ButtonComponent buttonText="Detaylar"  style={{backgroundColor: "#ffc300"}} onClick={goProductDetail}/>

          <FaMinus style={{ marginLeft: "10px", cursor: "pointer" }} onClick={onDeleteProductFromFavorite}/>
        </div>
      </Content>
    </Content>
  );
};

export default UserFavoriteProduct;
