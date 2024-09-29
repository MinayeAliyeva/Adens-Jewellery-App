import React from "react";
import { List, Rate, Typography } from "antd";

const { Paragraph } = Typography;

interface IReview {
  content: string;
  rating: number; 
}

interface IProps {
  reviews: IReview[]; 
}

const CommentList: React.FC<IProps> = ({ reviews }) => {
  return (
    <List
      dataSource={reviews}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <Rate disabled defaultValue={item.rating} />
          <Paragraph style={{ marginLeft: "10px" }}>{item.content}</Paragraph>
        </List.Item>
      )}
    />
  );
};

export default CommentList;
