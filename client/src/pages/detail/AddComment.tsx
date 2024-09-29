import React from "react";
import { Input, Rate, Button } from "antd";

interface AddCommentProps {
  content: string;
  rating: number;
  setContent: (value: string) => void;
  setRating: (value: number) => void;
  handleReviewSubmit: () => void;
}

const AddComment: React.FC<AddCommentProps> = React.memo(({ content, rating, setContent, setRating, handleReviewSubmit }) => {
  return (
    <div>
      <Input.TextArea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write Comment..."
        style={{ borderRadius: "5px" }}
      />
      <Rate onChange={setRating} value={rating} style={{ marginTop: "10px" }} />
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
  );
});

export default AddComment;
