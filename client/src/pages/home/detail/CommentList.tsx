import { FC, memo } from "react";
import { Avatar, Card, List, Rate, Typography } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import {
  useDeleteAllCommentFromReviewsMutation,
  useDeleteCommentFromReviewsMutation,
  useGetReviewByProductIdQuery,
} from "../../../redux/api/review/review-api";
import { isEmpty } from "lodash";
import { getUserFromToken } from "../../../shared/helpers/authStorage";

interface ICommentProps {
  productId: string;
}

const CommentList: FC<ICommentProps> = ({ productId }) => {
  const userData = getUserFromToken();
  const { data: reviewData } = useGetReviewByProductIdQuery(
    { productId },
    { skip: !productId }
  );
  const [deleteComment] = useDeleteCommentFromReviewsMutation();

  const [deleteAllComment] = useDeleteAllCommentFromReviewsMutation();

  const transformReviewsData = reviewData?.reviews?.map((review: any) => ({
    userName: review.user.firstName + " " + review.user.lastName,
    userId: review.user.id,
    body: [
      {
        content: review.comments,
        rating: review.rating,
        userId: review.user.id,
      },
    ],
  }));
  const onDeleteComment = (comment: string) => {
    deleteComment({ productId, userId: userData?._id!, comment }).then(
      (res) => {
        console.log({ res });
      }
    );
  };

  const onDeleteAllComment = () => {
    deleteAllComment({ userId: userData?._id!, productId });
  };

  return (
    <>
      <Card
        title="Comments"
        style={{
          marginBottom: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {isEmpty(transformReviewsData) ? (
          <> Henuz yorum yapılmadı</>
        ) : (
          <List
            dataSource={transformReviewsData}
            renderItem={(rewiev: any, index) => (
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
                  <Content
                    style={{ display: "flex", gap: "10px", marginLeft: "10px" }}
                  >
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Typography>{rewiev?.userName}</Typography>
                  </Content>
                  {/* {userData?._id === rewiev?.userId && (
                    <MdDeleteOutline
                      onClick={onDeleteAllComment}
                      className="text-red-500 text-2xl cursor-pointer"
                    />
                  )} */}
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
                  {rewiev?.body?.map((item: any) => {
                    return (
                      <Content
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Content style={{ marginLeft: "10px" }}>
                          {item?.content?.map((comment: any) => (
                            <Content style={{ display: "flex" }}>
                              {userData?._id === item.userId && (
                                <MdDeleteOutline
                                  onClick={() => onDeleteComment(comment)}
                                  className="text-red-500 text-2xl cursor-pointer"
                                />
                              )}
                              <Typography.Text>{comment}</Typography.Text>
                            </Content>
                          ))}
                        </Content>
                        <Rate disabled value={item?.rating} />
                      </Content>
                    );
                  })}
                </Content>
              </List.Item>
            )}
          />
        )}
      </Card>
    </>
  );
};

export default memo(CommentList);
