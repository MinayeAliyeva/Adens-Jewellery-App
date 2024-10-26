import CreateEditDialogButton from "./product-dialog/OpenEditDialog";
import OpenDeleteDialogButton from "./product-dialog/OpenDeleteDialog";
import Typography from "antd/es/typography/Typography";
import { Content } from "antd/es/layout/layout";
import { FaRegEdit } from "react-icons/fa";
import { IBrandsResponse } from "../../store/api/brand/modules";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import { IProduct } from "../../store/api/product/modules";
import { TFunction } from "i18next";

export const sizeOptions = [
  { label: "Small", value: "S" },
  { label: "Medium", value: "M" },
  { label: "Large", value: "L" },
];

export const columns = (t: TFunction<"translation", string>)=>[
  {
    title: "Image",
    dataIndex: "mainImageUrl",
    key: "mainImageUrl",
    render: (_: string, record: IProduct) => {
      return (
        <img
          src={record?.mainImageUrl}
          alt={record?.productName}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      );
    },
  },
  {
    title: t("Product Name"),
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
