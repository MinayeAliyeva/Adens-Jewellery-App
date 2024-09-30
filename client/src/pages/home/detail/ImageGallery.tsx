import { Modal } from "antd";
import React, { FC, memo, useState } from "react";
interface IProduct {
  productImgGallery: string[];
  productName: string;
  productPrice: string;
  productDetails: string;
  productId: number;
  viewCount: number;
  comments?: {
    body: string;
    rating: number;
    username: string;
  }[];
}
interface IImageGalleryProps {
  product: IProduct;
}
const ImageGallery: FC<IImageGalleryProps> = ({ product }) => {
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
    </div>
  );
};

export default memo(ImageGallery);
