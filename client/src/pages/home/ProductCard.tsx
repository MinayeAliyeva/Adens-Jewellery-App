import { FC, useState } from "react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  InfoCircleOutlined,
  SwapOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

interface IProps {
  product: {
    productImg: string;
    productImgHover: string;
    productName: string;
    productPrice: string;
    productDetails: string;
    productId: number;
    availableColors: string[]; 
  };
}

const ProductCard: FC<IProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Seçilen boyutu tutmak için state

  return (
    <div
      className="w-full max-w-md transition-transform hover:scale-105 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: "800px", width: "500px" }}
    >
      <div className="relative w-full h-2/3 overflow-hidden">
        <img
          alt="product"
          src={product.productImg}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          alt="product hover"
          src={product.productImgHover}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white border border-gray-300 rounded-full p-3 flex justify-center items-center">
            <Link to={`/cart`}>
              <ShoppingCartOutlined className="text-3xl cursor-pointer transition-colors duration-300" />
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-full p-3 flex justify-center items-center">
            <Link to={`/wishlist`}>
              <HeartOutlined className="text-3xl cursor-pointer transition-colors duration-300" />
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-full p-3 flex justify-center items-center">
            <Link to={`/detail/${product?.productId}`}>
              <InfoCircleOutlined className="text-3xl cursor-pointer transition-colors duration-300" />
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-full p-3 flex justify-center items-center">
            <Link to={`/compare`}>
              <SwapOutlined  className="text-3xl cursor-pointer transition-colors duration-300" />
            </Link>
          </div>
        </div>

        {isHovered && (
          <div className="absolute bottom-4 left-3 right-3 flex flex-col items-center bg-white bg-opacity-80 p-4 ">
            {" "}
            <span className="text-md font-semibold mb-7">
              Select Options:
            </span>{" "}
            <div className="flex space-x-6">
              {" "}
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className={`border px-4 py-1 transition duration-300 ${
                    selectedSize === size ? "bg-white" : "hover:bg-white"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 h-1/3">
        <h3 className="text-xl font-semibold text-gray-800">
          {product.productName}
        </h3>
        <p className="text-lg font-bold text-gray-900 mt-4">
          {product.productPrice}
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default ProductCard;
