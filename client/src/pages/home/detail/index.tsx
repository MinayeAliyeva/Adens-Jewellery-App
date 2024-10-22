import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { useGetProducDetailByIdQuery } from "../../../redux/api/product/product-api";
import ProductDetail from "./ProductDetail";
import { IProduct } from "../../../redux/api/product/modules";

const Detail = () => {
  const { id } = useParams();
  const { data: product } = useGetProducDetailByIdQuery<{ data: IProduct }>(
    id!
  );

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f7f9fc",
        minHeight: "900px",
      }}
    >
      <ProductDetail product={product} />
      <CommentList productId={product?._id} />
      <AddComment productId={product?._id} />
    </div>
  );
};

export default Detail;
