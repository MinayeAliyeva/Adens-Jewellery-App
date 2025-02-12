import { Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { FC, useEffect } from "react";
import { IProduct } from "../../../redux/api/product/models";
import { Content } from "antd/es/layout/layout";
import { useDispatch } from "react-redux";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { useAddBasketMutation } from "../../../redux/api/basket/basket-api";
import {
  useAddProductToFavoriteMutation,
  useLazyGetFavoriteByUserIdQuery,
} from "../../../redux/api/favorite/favorite-api";
import { setFavoriteProductCount } from "../../../redux/features/favoriteProductCount";
import { setBasketProductCount } from "../../../redux/features/basketProductCountSlice";
import { showErrorToast, showSuccessToast } from "../../../shared/components/NotficationComponent";


interface IProductInfoProps {
  product: IProduct;
}

const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = getUserFromToken();

  const [addBasket] = useAddBasketMutation();

  const [getUserFavoriteData, { data: userFavoriteDate }] =
    useLazyGetFavoriteByUserIdQuery();

  const [addFavorite, { isLoading: isLoadingAddUserFavoriteData }] =
    useAddProductToFavoriteMutation();

  useEffect(() => {
    if (userData?._id && !isLoadingAddUserFavoriteData) {
      getUserFavoriteData({ userId: userData?._id ?? "" });
    }
  }, [userData?._id, isLoadingAddUserFavoriteData]);

  const isActiveFavorite =
    userFavoriteDate?.products?.find((p) => p.productId?._id === product?._id)
      ?.isFavorite ?? false;

  const uptadedWithList = () => {
    addFavorite({
      productId: product?._id,
      userId: userData?._id ?? ""
    }).then((res) => {
      if (isEmpty(res?.data)) return;
      dispatch(
        setFavoriteProductCount(res.data?.wishList?.products?.length ?? 0)
      );
    });
  }


  const onCreateWishList = () => {
    if (!userData?._id) {
      showErrorToast(t("You must be a member for this process."));
      return;
    }
    showSuccessToast(t("Product Add to Wishlist"));
    uptadedWithList();
  };

  const onRemoveWishList = () => {
    if (!userData?._id) {
      showErrorToast(t("You must be a member for this process."));
      return;
    }
    showSuccessToast(t("Product Remove to Wishlist"));
    uptadedWithList();
  };

  const onCreateOrder = () => {
    if (!userData?._id) {
      showErrorToast(t("You must be a member for this process."));
      return;
    }
    addBasket({
      productId: product?._id,
      userId: userData?._id,
      quantity: 1,
    }).then((res) => {
      if (isEmpty(res?.data)) return;
      dispatch(setBasketProductCount(res?.data?.basket?.products.length));

      if (res?.data.basket?.products.find((p) => p?.quantity === 1)) {
        showSuccessToast(t("Product added to basket"));
      } else showSuccessToast(t("Your basket quantity updated successfully"));
    });
  };

  const handlePayment = () => {
    if (!userData?._id) {
      showErrorToast(t("You must be a member for this process."));
      return;
    }
    showSuccessToast("Payment process started successfully.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Content style={{ position: "absolute", top: 0, right: 0 }}>
        {isActiveFavorite ? (
          <HeartFilled
            className="cursor-pointer transition-colors duration-300 text-3xl text-red-600"
            onClick={onRemoveWishList}
          />
        ) : (
          <HeartOutlined
            className="cursor-pointer transition-colors duration-300 text-3xl"
            onClick={onCreateWishList}
          />
        )}
      </Content>
      <Title level={4}>{product?.productName}</Title>
      <Paragraph style={{ fontWeight: "bold", fontSize: "18px" }}>
        {`₺${product?.price}`}
      </Paragraph>
      <Paragraph>{product?.description}</Paragraph>
      {product?.size && product?.size.length > 0 && (
        <Paragraph>
          <strong>Size:</strong> {product?.size.join(", ")}{" "}
        </Paragraph>
      )}
      {product?.color && (
        <Paragraph>
          <strong>Color:</strong> {product?.color}
        </Paragraph>
      )}
      {product?.totalQty && (
        <Paragraph>
          <strong>Stock:</strong> {product?.totalQty}
        </Paragraph>
      )}
      {product?.weight && (
        <Paragraph>
          <strong>Weight:</strong> {product?.weight} kg
        </Paragraph>
      )}
      {product?.dimensions && (
        <Paragraph>
          <strong>Dimensions:</strong> {product?.dimensions}
        </Paragraph>
      )}
      {product?.warrantyDuration && (
        <Paragraph>
          <strong>Warranty Duration:</strong> {product?.warrantyDuration} years
        </Paragraph>
      )}
      {product?.category && (
        <Paragraph>
          <strong>Category:</strong> {product?.category?.name}
        </Paragraph>
      )}
      {product?.brand && (
        <Paragraph>
          <strong>Brand:</strong> {product?.brand?.name}
        </Paragraph>
      )}
      {product?.creationDate && (
        <Paragraph>
          <strong>Creation Date:</strong>{" "}
          {new Date(product.creationDate).toLocaleDateString()}
        </Paragraph>
      )}

 

        <Button
          type="primary"
          icon={
            <ShoppingCartOutlined className="text-lg cursor-pointer transition-colors duration-300" />
          }
          onClick={onCreateOrder}
          size="large"
          style={{
            backgroundColor: "#ffc300",
            borderColor: "#ffc300",
            fontWeight: "bold",
          }}
        >
          Sebete Ekle
        </Button>
    </div>
  );
};

export default ProductInfo;
