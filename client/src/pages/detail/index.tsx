import React, { useState } from "react";
import { Card, Rate, Input, Button, List, Typography, Row, Col } from "antd";
import productImg1 from "../../assets/images/pro-10.jpg"; 

const { Title, Paragraph } = Typography;

const Detail = () => {
  const product = {
    productImg: productImg1,
    productName: "Product 1",
    productPrice: "$20",
    productDetails: "Material: Cotton",
    productId: 1,
  };

  const [reviews, setReviews] = useState<{ content: string; rating: number }[]>(
    []
  );
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = () => {
    if (content && rating) {
      setReviews([...reviews, { content, rating }]);
      setContent("");
      setRating(0);
    }
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
          <Col xs={24} sm={12}>
            <img
              src={product?.productImg}
              alt={product?.productName}
              style={{
                width: "100%",
                borderRadius: "10px",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Title level={2}>{product?.productName}</Title>
            <Paragraph>{product?.productDetails}</Paragraph>
            <Paragraph
              style={{ fontWeight: "bold", fontSize: "18px", color: "#1890ff" }}
            >
              {product?.productPrice}
            </Paragraph>
            <Rate disabled defaultValue={3} />
          </Col>
        </Row>
      </Card>

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
            style={{ marginTop: "10px", width: "200px", borderRadius: "5px",    backgroundColor: "#40331D", }}
          >
            Send Comment 
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Detail;
