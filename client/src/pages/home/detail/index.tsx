import React, { useState } from "react";
import { Card, Rate, List, Typography, Row, Col, Modal } from "antd";
import { useForm } from "react-hook-form";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import ImageGallery from "./ImageGallery";
const productImg1 = "/assets/images/carusel3.jpg";
const productImg2 = "/assets/images/carusel2.jpg";
const productImg3 = "/assets/images/carusel1.jpg";

const { Title, Paragraph } = Typography;

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

const Detail = () => {
  // const [reviews, setReviews] = useState<{ content: string; rating: number }[]>(
  //   product.comments.map((comment) => ({
  //     content: comment.body,
  //     rating: comment.rating,
  //   }))
  // );

  const [previewImage, setPreviewImage] = useState(
    product.productImgGallery[0]
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onSubmit = (data: any) => console.log(data);

  const handleImageClick = (img: string) => {
    setPreviewImage(img);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm();

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f7f9fc",
        minHeight: "900px",
      }}
    >

      <ImageGallery />


      <CommentList />

      <form onSubmit={handleSubmit(onSubmit)}>
        <AddComment control={control} />
      </form>
    </div>
  );
};

export default Detail;
