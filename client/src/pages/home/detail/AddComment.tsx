import { FC, memo } from "react";
import { Button, Card, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { TextAreaComponent } from "../../../shared/components/form-components/TextAreaComponent";
import { RateComponent } from "../../../shared/components/form-components/RateComponent";
import { useAddReviewToProductMutation } from "../../../redux/api/review/review-api";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";

interface IAddCommentProps {
  productId: string;
}
interface IFormField {
  comment: string;
  rating?: number;
}
const AddComment: FC<IAddCommentProps> = ({ productId }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm<IFormField>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const userData = getUserFromToken();
  const [addComment, { isLoading: isLoadingAddComment }] = useAddReviewToProductMutation();

  const onSubmit = (data: IFormField) => {
    const { rating, comment } = data;
    const user = {
      id: userData?._id,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
    };
    if (!comment) {
      setError("comment", {
        message: "Please add comment",
      });
      return;
    }
    addComment({ user, productId, rating, comment }).then((res) => {
      if (isEmpty(res?.data?.reviews)) return;
      reset();
    });
  };

  return (
    <Card
      title="Add Comment"
      style={{
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextAreaComponent control={control} name="comment" />
        {errors?.comment?.message && (
          <>
            <Typography.Text type="danger">
              {errors?.comment?.message}
            </Typography.Text>{" "}
            <br />
          </>
        )}
        <RateComponent control={control} name="rating" />
        <Content>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isEmpty(userData)}
            loading={isLoadingAddComment}
            style={{
              marginTop: "10px",
              width: "200px",
              borderRadius: "5px",
              backgroundColor: isEmpty(userData) ? "#BFBFBF" : "#40331D", // Disabled üçün açıq boz
              color: isEmpty(userData) ? "#666666" : "#fff", // Disabled üçün daha açıq mətni
              cursor: isEmpty(userData) ? "not-allowed" : "pointer", // İstifadəçi üçün işarə
            }}
          >
            Send Comment
          </Button>
        </Content>
      </form>
    </Card>
  );
};

export default memo(AddComment);
