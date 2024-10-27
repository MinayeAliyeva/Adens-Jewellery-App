import { FC, memo } from "react";
import { Card } from "antd";
import { IProduct } from "../../../redux/api/product/modules";
import { Content } from "antd/es/layout/layout";
import ProductCard from "../../../shared/components/ProductCard";

interface RelatedProductsProps {
  relatedProducts?: IProduct[];
}

const RelatedProducts: FC<RelatedProductsProps> = ({
  relatedProducts = [],
}) => {
  return (
    <Card
      title="Related Products"
      style={{
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Content
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {relatedProducts?.map((product) => (
          <ProductCard product={product} key={product?._id} />
        ))}
      </Content>
    </Card>
  );
};

export default memo(RelatedProducts);
