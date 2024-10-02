import { Content } from "antd/es/layout/layout";
import { ButtonComponent } from "../../components/ButtonComponent";

export const sizeOptions = [
  { label: "Small", value: "S" },
  { label: "Medium", value: "M" },
  { label: "Large", value: "L" },
];
export const columns = [
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
      );
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
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Weight (g)",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "CreationDate",
    dataIndex: "creationDate",
    key: "creationDate",
    render: (item: string, record: any) => {
      console.log({ item, record });
      return item;
    },
  },
  {
    title: "Dimensions",
    dataIndex: "dimensions",
    key: "dimensions",
  },
  {
    title: "WarrantyDuration",
    dataIndex: "warrantyDuration",
    key: "warrantyDuration",
  },
  {
    title: "",
    key: "actions",
    render: (text: any, record: any) => {
      return (
        <Content style={{ display: "flex", gap: "20px" }}>
          <ButtonComponent buttonText="Edit" />
          <ButtonComponent danger buttonText="Delete" />
        </Content>
      );
    },
  },
];
