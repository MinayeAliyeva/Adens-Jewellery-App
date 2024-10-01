import {  memo } from "react";
import { Avatar, Card, List, Rate, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const { Paragraph } = Typography;

interface IReview {
  content: string;
  rating: number;
}

interface IProps {
  reviews: IReview[];
}
const reviews = [
  {
    userName: "JohnDue",
    userImg: "img",
    body: [
      { content: "comment1", rating: 5 },
      { content: "comment2", rating: 2 },
    ],
  },
  {
    userName: "JohnDue",
    userImg: "img",
    body: [{ content: "Azerbaijan", rating: 5 }],
  },
];
const CommentList = () => {
  return (
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
        renderItem={(rewiev, index) => (
          <List.Item
            style={{ display: "flex", flexDirection: "column" }}
            key={index}
          >
            <Content
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                width: "100%",
              }}
            >
              <Avatar size="small" icon={<UserOutlined />} />
              <Typography>{rewiev?.userName}</Typography>
            </Content>
            <Content
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                columnGap: "10px",
                width: "100%",
                marginTop: "10px",
              }}
            >
              {rewiev?.body?.map((item) => {
                return (
                  <Content
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Paragraph style={{ marginLeft: "10px" }}>
                      {item?.content}
                    </Paragraph>
                    <Rate disabled defaultValue={item?.rating} />
                  </Content>
                );
              })}
            </Content>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default memo(CommentList);
