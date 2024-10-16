import { Content } from "antd/es/layout/layout";
import CreateEditDialogButton from "./product-dialog/OpenEditDialog";
import { IProduct } from "../../store/api/product/modules";
import OpenDeleteDialogButton from "./product-dialog/OpenDeleteDialog";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import Typography from "antd/es/typography/Typography";
import { IBrandsResponse } from "../../store/api/brand/modules";
import { FaRegEdit } from "react-icons/fa";

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
    render: (_: string, record: IProduct) => {
      return (
        <img
          src={record?.mainImageUrl}
          alt={record.productName}
          style={{ width: 50, height: 50, objectFit: "cover" }}
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
    render: (item: string[]) => item?.join(", "),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Catagory",
    dataIndex: "category",
    key: "category",
    render: (category: ICatagoryResponse) => <Typography>{category?.name}</Typography>
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    render: (brand: IBrandsResponse) => <Typography>{brand?.name}</Typography>
  },
  {
    title: "Total product count",
    dataIndex: "totalQty",
    key: "totalQty",
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
    render: (_: string, record: IProduct) => {
      return (
        <Content style={{ display: "flex", gap: "20px" }}>
          <CreateEditDialogButton product={record} icon={<FaRegEdit/>}  buttonText="Edit" variant="dashed"/>
          <OpenDeleteDialogButton product={record} />
        </Content>
      );
    },
  },
];
