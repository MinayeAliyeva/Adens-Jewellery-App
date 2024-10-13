import {
  HeartOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../store/api/product/modules";
import { Content } from "antd/es/layout/layout";
import { Typography } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";

interface IProps {
  product: IProduct;
}

const ProductCard: FC<IProps> = ({ product }) => {
  return (
    <Content
      className="w-full max-w-md transition-transform hover:scale-105 relative group"
      style={{ height: "600px", width: "400px" }}
    >
      <Content className="relative w-full h-2/3 overflow-hidden">
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

        <Content className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Content className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/cart`}>
              <ShoppingCartOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </Content>

          <Content className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/wishlist`}>
              <HeartOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </Content>

          <Content className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/product/detail/${product._id}`}>
              <InfoCircleOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </Content>

          <Content className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/compare`}>
              <SwapOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </Content>
        </Content>

        <Content className="absolute bottom-4 left-3 right-3 flex flex-col items-center bg-white bg-opacity-80 p-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Typography className="text-md font-semibold mb-7">
            Select Options:
          </Typography>
          <Content className="flex space-x-6">
            {product?.size?.map((size: string) => (
              <Typography
                key={size}
                className="border px-4 py-1 transition duration-300 hover:bg-white"
              >
                {size}
              </Typography>
            ))}
          </Content>
        </Content>
      </Content>

      <Content className="mt-6 h-1/3">
        <Typography className="text-xl font-semibold text-gray-800">
          {product?.productName}
        </Typography>
        <Typography className="text-xl font-semibold text-gray-800">
          Category: {product?.category?.name}
        </Typography>
        <Typography className="text-xl font-semibold text-gray-800">
          Brand: {product?.brand?.name}
        </Typography>
        <Typography className="text-xl font-semibold text-gray-800">
          Price: {product?.price}
        </Typography>

        <Typography className="text-xl font-semibold text-gray-800">
          weight: {product?.weight}
        </Typography>
        <Typography className="text-xl font-semibold text-gray-800">
        dimensions: {product?.dimensions}
        </Typography>
        <Typography className="text-xl font-semibold text-gray-800">
        warrantyDuration: {product?.warrantyDuration}
        </Typography>

        {product?.stock > 0 ? (
          <Typography className="text-green-600 mt-2">In Stock</Typography>
        ) : (
          <Content className="flex items-center mt-2">
            <Typography className="text-red-600 mr-2">Out of Stock</Typography>
            <IoIosNotificationsOutline />
          </Content>
        )}
      </Content>
    </Content>
  );
};

export default ProductCard;
