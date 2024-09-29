import { FC, memo } from "react";
import { Button, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import { TextAreaComponent } from "../../../shared/components/form-components/TextAreaComponent";
import { RateComponent } from "../../../shared/components/form-components/RateComponent";

interface AddCommentProps {
  content?: string;
  rating?: number;
  setContent?: (value: string) => void;
  setRating?: (value: number) => void;
  handleReviewSubmit?: () => void;
  methods?: any;
  control: any;
}

const AddComment: FC<AddCommentProps> = memo(({ control }) => {
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
      <TextAreaComponent control={control} />
      <RateComponent control={control} />
      <Content>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            marginTop: "10px",
            width: "200px",
            borderRadius: "5px",
            backgroundColor: "#40331D",
          }}
        >
          Send Comment
        </Button>
      </Content>
    </Card>
  );
});

export default AddComment;
