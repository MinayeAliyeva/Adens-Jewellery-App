import { useForm } from "react-hook-form";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import ImageGallery from "./ImageInfo";

const Detail = () => {
  const onSubmit = (data: any) => console.log(data);

  const {
    handleSubmit,
    formState: { errors },
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
