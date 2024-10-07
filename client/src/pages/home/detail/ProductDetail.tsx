import { FC, memo } from "react";
import { Card, Col, Row } from "antd";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import { IProduct } from "../../../../../admin/src/store/api/product/modules";

interface IProductDetailProps {
  product: IProduct;
}
const ProductDetail: FC<IProductDetailProps> = memo(({ product }) => {
  const initialProductValue = {
    mainImageUrl: "",
    additionalImages: [""],
    productName: "",
  };
  console.log("product,", product);

  const {
    mainImageUrl,
    additionalImages,
    productName,

  } = product ?? initialProductValue;
  console.log({ mainImageUrl, additionalImages, productName });

  return (
    <Card
      style={{
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        height: "100%",
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={16}>
          <ImageGallery
            mainImageUrl={mainImageUrl}
            additionalImages={additionalImages}
            productName={productName}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProductInfo product={product} />
        </Col>
      </Row>
    </Card>
  );
});

export default ProductDetail;
