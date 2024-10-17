import { useForm } from "react-hook-form";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { useGetProducDetailByIdQuery } from "../../../redux/api/product/product-api";
import ProductDetail from "./ProductDetail";
import { IProduct } from "../../../redux/api/product/modules";

const Detail = () => {
  const {id} = useParams();
  console.log("DETAIL id",id);
  
  const { data: product } = useGetProducDetailByIdQuery<{data:IProduct}>(id!);

  console.log("DETAIL", {product});
  const { handleSubmit, control } = useForm();

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f7f9fc",
        minHeight: "900px",
      }}
    >
      <ProductDetail product={product}/>
      <CommentList />
      <form onSubmit={handleSubmit((data: any) => {})}>
        <AddComment control={control} />
      </form>
    </div>
  );
};

export default Detail;
