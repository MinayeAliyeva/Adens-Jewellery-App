import { FC, memo } from "react";
import { Avatar, Card, List, Rate, Typography } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { isEmpty } from "lodash";
import {
  useDeleteCommentFromReviewsMutation,
  useGetReviewByProductIdQuery,
} from "../../../redux/api/review/review-api";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { IReview, IUserCommentResponse } from "../../../redux/api/review/modules";

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

  const transformReviewsData: IUserCommentResponse[] = reviewData?.reviews?.map((review: IReview) => ({
    userName: `${review?.user?.firstName} ${review?.user?.lastName}`,
    userId: review?.user?.id,
    body: [
      {
        content: review?.comments || [],
        userId: review?.user?.id,
      },
    ],
  }))!;
  
  const onDeleteComment = (commentId: string) => {
    deleteComment({ productId, userId: userData?._id!, commentId }).then(
      (res) => {}
    );
  };

  return (
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
                <Content
                  style={{ display: "flex", gap: "10px", marginLeft: "10px" }}
                >
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Typography>{rewiev?.userName}</Typography>
                </Content>
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
                {rewiev?.body?.map((item, index: number) => {
                  return (
                    <Content
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Content style={{ marginLeft: "10px" }}>
                        {item?.content?.map((data) => (
                          <Content style={{ display: "flex" }} key={data?._id}>
                            {userData?._id === item.userId && (
                              <MdDeleteOutline
                                onClick={() => onDeleteComment(data?._id)}
                                className="text-red-500 text-2xl cursor-pointer"
                              />
                            )}
                            <Typography.Text>{data?.comment}</Typography.Text>
                            {data?.rating && (
                              <Rate disabled value={data?.rating} />
                            )}
                          </Content>
                        ))}
                      </Content>
                    </Content>
                  );
                })}
              </Content>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default memo(CommentList);
