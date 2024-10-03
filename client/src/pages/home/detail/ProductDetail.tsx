import { Card, Col, Modal, Row, Button, message, Statistic } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { EyeOutlined, DollarCircleOutlined } from "@ant-design/icons";
import {  FC, memo, useState } from "react";
import ProductInfo from "./ProductInfo";
import ImageGallery from "./ImageGallery";
import { IProduct } from '../../../../../admin/src/store/api/product/modules';



const productImg1 = "/assets/images/carusel3.jpg";
const productImg2 = "/assets/images/carusel2.jpg";
const productImg3 = "/assets/images/carusel1.jpg";
const product = {
    productImgGallery: [productImg1, productImg2, productImg3],
    productName: "Gold Diamond Ring",
    productPrice: "$1350",
    productDetails: "A stunning 18K gold ring featuring a brilliant cut diamond.",
    productId: 12345,
    viewCount: 150, 
    comments: [
      {
        body: "Very beautiful and well-crafted ring!",
        rating: 5,
        username: "jane_doe",
      },
    ],
  };

interface IProductDetailProps {
  product: IProduct;
}
const ProductDetail:FC<IProductDetailProps> = memo(({product}) => {

  console.log("page ProductDetail",{product});
  const {mainImageUrl="" ,additionalImages=[""], productName=""} = product ?? {};

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
       <ImageGallery mainImageUrl={mainImageUrl} additionalImages={additionalImages} productName={productName}/>
        </Col>
        <Col xs={24} sm={8}>
       {/* <ProductInfo product={product}/> */}
        </Col>
      </Row>

    </Card>
  );
});

export default ProductDetail;
