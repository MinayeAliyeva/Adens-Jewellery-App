import React from "react";
import { Modal } from "antd";

interface ImageGalleryProps {
  images: string[];
  previewImage: string;
  onImageClick: (img: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = React.memo(({ images, previewImage, onImageClick }) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={previewImage}
        alt="Product"
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "10px",
          objectFit: "cover",
          transition: "transform 0.5s ease-in-out",
        }}
        onClick={() => onImageClick(previewImage)}
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
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => onImageClick(img)}
            style={{
              width: "60px",
              height: "60px",
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
  );
});

export default ImageGallery;
