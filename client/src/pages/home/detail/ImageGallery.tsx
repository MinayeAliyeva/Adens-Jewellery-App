import { Card, Col, Modal, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { FC, memo, useState } from "react";
const productImg1 = "/assets/images/carusel3.jpg";
const productImg2 = "/assets/images/carusel2.jpg";
const productImg3 = "/assets/images/carusel1.jpg";
interface ImageGalleryProps {
  images: string[];
  previewImage: string;
  onImageClick: (img: string) => void;
}
const product = {
  productImgGallery: [productImg1, productImg2, productImg3],
  productName: "Gold Diamond Ring",
  productPrice: "$1350",
  productDetails: "A stunning 18K gold ring featuring a brilliant cut diamond.",
  productId: 12345,
  comments: [
    {
      body: "Very beautiful and well-crafted ring!",
      rating: 5,
      username: "jane_doe",
    },
  ],
};
const ImageGallery = memo(() => {
  const [previewImage, setPreviewImage] = useState(
    product.productImgGallery[0]
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageClick = (img: string) => {
    setPreviewImage(img);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
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
          <div style={{ position: "relative", height: "100%" }}>
            <img
              src={previewImage}
              alt={product.productName}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                objectFit: "cover",
                transition: "transform 0.5s ease-in-out",
              }}
              onClick={() => handleImageClick(previewImage)}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                display: "flex",
                gap: "10px",
              }}
            >
              {product.productImgGallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.productName}
                  onClick={() => handleImageClick(img)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "5px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: previewImage === img ? "2px solid #1890ff" : "none",
                    transition: "border 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <div style={{ padding: "20px" }}>
            <Title level={4}>{product.productName}</Title>
            <Paragraph style={{ fontWeight: "bold", fontSize: "18px" }}>
              {product.productPrice}
            </Paragraph>
            <Paragraph>{product.productDetails}</Paragraph>
          </div>
        </Col>
      </Row>
      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        style={{ textAlign: "center" }}
      >
        <img
          src={previewImage}
          alt={product.productName}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        />
      </Modal>
    </Card>
  );
});

export default ImageGallery;
