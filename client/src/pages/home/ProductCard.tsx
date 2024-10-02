import {
  HeartOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { FC, useState } from "react";
import { Link } from "react-router-dom";


interface IProps {
  product: {
    productImg: string;
    productImgHover: string;
    productName: string;
    productPrice: string;
    productDetails?: string;
    productId: string;
    availableColors: string[];
    stock: number;
    discount: number;
    brand: string;
    catagoryName: string;
    additionalImages: string[];
  };
}

const ProductCard: FC<any> = ({ product }) => {
 console.log("product",product);
 console.log("id",product._id);
 
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const calculateDiscountedPrice = () => {
    const price = parseFloat(product.productPrice.replace("$", ""));
    const discountedPrice = price - (price * product.discount) / 100;
    return `$${discountedPrice.toFixed(2)}`;
  };

  return (
    <div
      className="w-full max-w-md transition-transform hover:scale-105 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: "600px", width: "400px" }}
    >
      <div className="relative w-full h-2/3 overflow-hidden">
        {product.discount > 0 && (
          <span
            style={{ backgroundColor: "rgb(84 40 40)" }}
            className="absolute top-2 left-2 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
          >
            {product.discount}% OFF
          </span>
        )}

        <img
          alt="product"
          src={product.mainImageUrl}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          alt="product hover"
          src={product.additionalImages?.[0]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/cart`}>
              <ShoppingCartOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/wishlist`}>
              <HeartOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/detail/${product?.productId}`}>
              <InfoCircleOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-full p-2 flex justify-center items-center">
            <Link to={`/compare`}>
              <SwapOutlined className="text-lg cursor-pointer transition-colors duration-300" />
            </Link>
          </div>
        </div>

        {isHovered && (
          <div className="absolute bottom-4 left-3 right-3 flex flex-col items-center bg-white bg-opacity-80 p-4 z-10">
            <span className="text-md font-semibold mb-7">Select Options:</span>
            <div className="flex space-x-6">
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

        <div className="text-lg font-bold text-gray-900 mt-4">
          {product.discount > 0 ? (
            <>
              <span className="line-through text-gray-500">
                {product.productPrice}
              </span>
              <span className="ml-2">{calculateDiscountedPrice()}</span>
            </>
          ) : (
            product.productPrice
          )}
        </div>

        {product.stock > 0 ? (
          <p className="text-green-600 mt-2">In Stock</p>
        ) : (
          <p className="text-red-600 mt-2">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
