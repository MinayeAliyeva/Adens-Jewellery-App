import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import RelatedProducts from "./RelatedProducts";
import { useGetProducDetailByIdQuery } from "../../../redux/api/product/product-api";

const Detail = () => {
  const { id } = useParams();
  const { data } = useGetProducDetailByIdQuery(
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
      <ProductDetail product={data?.product!} />
      <RelatedProducts relatedProducts={data?.relatedProducts!}/>
      <CommentList productId={data?.product?._id!} />
      <AddComment productId={data?.product?._id!}/>
    </div>
  );
};

export default Detail;
