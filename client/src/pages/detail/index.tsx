import React, { useState } from "react";
import {
  Card,
  Rate,
  Input,
  Button,
  List,
  Typography,
  Row,
  Col,
  Modal,
} from "antd";
import productImg1 from "../../assets/images/carusel3.jpg";
import productImg2 from "../../assets/images/carusel2.jpg";
import productImg3 from "../../assets/images/carusel1.jpg";

const { Title, Paragraph } = Typography;

const Detail = () => {
  const product = {
    productImgGallery: [productImg1, productImg2, productImg3],
    productName: "Gold Diamond Ring",
    productPrice: "$1350",
    productDetails:
      "A stunning 18K gold ring featuring a brilliant cut diamond.",
    productId: 12345,
    comments: [
      {
        body: "Very beautiful and well-crafted ring!",
        rating: 5,
        username: "jane_doe",
      },
    ],
  };

  const [reviews, setReviews] = useState<{ content: string; rating: number }[]>(
    product.comments.map((comment) => ({
      content: comment.body,
      rating: comment.rating,
    }))
  );
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [previewImage, setPreviewImage] = useState(
    product.productImgGallery[0]
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleReviewSubmit = () => {
    if (content && rating) {
      setReviews([...reviews, { content, rating }]);
      setContent("");
      setRating(0);
    }
  };

  const handleImageClick = (img: string) => {
    setPreviewImage(img);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f7f9fc" }}>
      <Card
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={16}>
            <div style={{ position: "relative" }}>
              <img
                src={previewImage}
                alt={product.productName}
                style={{
                  width: "100%",
                  height: "400px",
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
                      width: "60px",
                      height: "60px",
                      borderRadius: "5px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        previewImage === img ? "2px solid #1890ff" : "none",
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
      </Card>

      {/* <Modal
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
      </Modal> */}

      <Card
        title="Comments"
        style={{
          marginBottom: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <List
          dataSource={reviews}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <Rate disabled defaultValue={item.rating} />
              <Paragraph style={{ marginLeft: "10px" }}>
                {item.content}
              </Paragraph>
            </List.Item>
          )}
        />
      </Card>

      <Card
        title="Add Comment"
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input.TextArea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write Comment..."
          style={{ borderRadius: "5px" }}
        />
        <Rate
          onChange={setRating}
          value={rating}
          style={{ marginTop: "10px" }}
        />
        <div>
          <Button
            type="primary"
            onClick={handleReviewSubmit}
            style={{
              marginTop: "10px",
              width: "200px",
              borderRadius: "5px",
              backgroundColor: "#40331D",
            }}
          >
            Send Comment
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Detail;
