import XTable from "../../components/TestTable";
import { useGetProductsQuery } from "../../store/api/product/product-api";
import XButton from "./OpenDialog";

const columns = [
  {
    title: "Image",
    dataIndex: "mainImageUrl",
    key: "mainImageUrl",
    render: (text: any, record: any) => {
      console.log("record", record?.mainImageUrl);
      
      return (
        <img
          src={record?.mainImageUrl} 
          alt={record.productName} 
          style={{ width: 50, height: 50 }} 
        />
      )
    },
  },
  {
    title: "Name",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Catagory",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Material",
    dataIndex: "material",
    key: "material",
  },
  {
    title: "",
    key: "actions",
    render: (text: any, record: any) => {
      return (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      );
    },
  },
];

const Products = () => {
  const { data } = useGetProductsQuery();
  

  return (
    <>
      <XButton />
      <XTable data={data} columns={columns} />
    </>
  );
};

export default Products;
