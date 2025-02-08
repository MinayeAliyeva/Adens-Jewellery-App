import { Button, Rate, Typography } from "antd";
import { FC, memo, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  HeartFilled,
  HeartOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { showErrorToast, showSuccessToast } from "./NotficationComponent";
import { IProduct } from "../../redux/api/product/models";
import { getUserFromToken } from "../helpers/authStorage";
import { useAddBasketMutation } from "../../redux/api/basket/basket-api";
import { useAddProductToFavoriteMutation, useLazyGetFavoriteByUserIdQuery } from "../../redux/api/favorite/favorite-api";
import { setBasketProductCount } from "../../redux/features/basketProductCountSlice";
import { setFavoriteProductCount } from "../../redux/features/favoriteProductCount";


interface IProps {
  product: IProduct;
}

const ProductCard: FC<IProps> = ({ product }) => {
  const userData = getUserFromToken()!;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [addBasket] = useAddBasketMutation();
  const [addFavorite, { isLoading: isLoadingUserFavoriteData }] =
    useAddProductToFavoriteMutation();
  const [getUserFavoriteData, { data: userFavoriteDate }] =
    useLazyGetFavoriteByUserIdQuery();

  useEffect(() => {
    if (userData?._id && !isLoadingUserFavoriteData) {
      getUserFavoriteData({ userId: userData?._id ?? "" });
    }
  }, [userData?._id, isLoadingUserFavoriteData]);

  const isActiveFavorite =
    userFavoriteDate?.products?.find((p) => p.productId?._id === product?._id)
      ?.isFavorite ?? false;

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
      dispatch(setBasketProductCount(res?.data.basket?.products.length));
      if (res?.data.basket?.products.find((p) => p.quantity === 1)) {
        showSuccessToast(t("Product added to basket"));
      } else showSuccessToast(t("Your basket quantity updated successfully"));
    });
  };
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

  return (
    <div
      className="w-full max-w-md transition-transform hover:scale-105 relative group"
      style={{ height: "600px", width: "400px", padding: "20px", marginBottom: "120px" }}
    >
      <div className="relative w-full h-2/3 overflow-hidden">
        <img
          alt="product"
          src={product.mainImageUrl}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        />
        <img
          alt="product hover"
          src={product.additionalImages?.[0]}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            onClick={onCreateOrder}
            style={{ border: "none" }}
            shape="circle"
            icon={
              <ShoppingCartOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            }
          />

          <Button
            onClick={isActiveFavorite ? onRemoveWishList : onCreateWishList}
            style={{ border: "none" }}
            shape="circle"
            icon={
              isActiveFavorite ? (
                <HeartFilled className="text-lg cursor-pointer transition-colors duration-300 text-red-600" />
              ) : (
                <HeartOutlined className="text-lg cursor-pointer transition-colors duration-300" />
              )
            }
          />

          <div className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/product/detail/${product?._id}`}>
              <InfoCircleOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/products`}>
              <SwapOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-4 left-3 right-3 flex flex-col items-center bg-white bg-opacity-80 p-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex space-x-1">
            {product?.size?.map((size: string) => (
              <Typography
                key={size}
                className="border px-4 py-1 transition duration-300 hover:bg-white"
              >
                {size}
              </Typography>
            ))}
          </div>

          <Rate defaultValue={product?.averageRating} disabled />
        </div>
      </div>

      <div className="mt-2 h-1/3">
        <Typography className="text-[16px] font-semibold text-gray-800">
          Product Name: {product?.productName}
        </Typography>
        <Typography className="text-[16px] font-semibold text-gray-800">
          Category: {product?.category?.name}
        </Typography>
        <Typography className="text-[16px] font-semibold text-gray-800">
          Brand: {product?.brand?.name}
        </Typography>
        <Typography className="text-[16px] font-semibold text-gray-800">
          Price: {product?.price}
        </Typography>

        <Typography className="text-[16px] font-semibold text-gray-800">
          Weight: {product?.weight}
        </Typography>
        <Typography className="text-[16px] font-semibold text-gray-800">
          Dimensions: {product?.dimensions}
        </Typography>
        <Typography className="text-[16px] font-semibold text-gray-800">
          WarrantyDuration: {product?.warrantyDuration}
        </Typography>

        {product?.totalQty > 0 ? (
          <Typography className="text-green-600 mt-2">In Stock</Typography>
        ) : (
          <div className="flex items-center mt-2">
            <Typography className="text-red-600 mr-2">Out of Stock</Typography>
            <IoIosNotificationsOutline
              style={{ cursor: "pointer", fontSize: "20px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductCard);
