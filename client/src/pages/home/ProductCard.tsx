import { FC } from "react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

interface IProps {
  product: {
    productImg: string;
    productName: string;
    productPrice: string;
    productDetails: string;
    productId: number;
  };
}

const ProductCard: FC<IProps> = ({ product }) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={product?.productImg} />}
      actions={[
        <ShoppingCartOutlined key="basket" />,
        <HeartOutlined key="favorite" />,
        <Link to={`/detail/${product?.productId}`}>
          {" "}
          <InfoCircleOutlined key="detail" />
        </Link>,
      ]}
    >
      <Meta
        title={product.productName}
        description={`${product.productDetails} - ${product.productPrice}`}
      />
    </Card>
  );
};

export default ProductCard;
