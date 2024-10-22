import { Modal } from "antd";
import { FC, memo, useState } from "react";

interface IImageGalleryProps {
  productName: string;
  mainImageUrl: string;
  additionalImages: string[];
}

const ImageGallery: FC<IImageGalleryProps> = ({
  mainImageUrl,
  productName,
  additionalImages,
}) => {
  const [previewImage, setPreviewImage] = useState(mainImageUrl);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleImageClick = (img: string) => {
    setPreviewImage(img);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src={mainImageUrl} 
        alt={productName}
        style={{
          width: "100%",
          height: "450px",
          borderRadius: "10px",
          objectFit: "cover",
          transition: "transform 0.5s ease-in-out",
        }}
        onClick={() => handleImageClick(mainImageUrl)} 
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
        {[mainImageUrl, ...additionalImages].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={productName}
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
          alt={productName}
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
