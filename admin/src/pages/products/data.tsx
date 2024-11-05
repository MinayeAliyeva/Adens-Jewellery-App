import CreateEditDialogButton from "./product-dialog/OpenEditDialog";
import OpenDeleteDialogButton from "./product-dialog/OpenDeleteDialog";
import Typography from "antd/es/typography/Typography";
import { Content } from "antd/es/layout/layout";
import { FaRegEdit } from "react-icons/fa";
import { IBrandsResponse } from "../../store/api/brand/models";
import { ICatagoryResponse } from "../../store/api/catagory/models";
import { IProduct } from "../../store/api/product/models";
import { TFunction } from "i18next";

export const sizeOptions = [
  { label: "Small", value: "S" },
  { label: "Medium", value: "M" },
  { label: "Large", value: "L" },
];

export const columns = (t: TFunction<"translation", string>)=>[
  {
    title: t("Image"),
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
    title: t("Size"),
    dataIndex: "size",
    key: "size",
    render: (item: string[]) => item?.join(", "),
  },
  {
    title: t("Price"),
    dataIndex: "price",
    key: "price",
  },
  {
    title: t("Catagory"),
    dataIndex: "category",
    key: "category",
    render: (category: ICatagoryResponse) => <Typography>{category?.name}</Typography>
  },
  {
    title: t("Brand"),
    dataIndex: "brand",
    key: "brand",
    render: (brand: IBrandsResponse) => <Typography>{brand?.name}</Typography>
  },
  {
    title: t("Product count"),
    dataIndex: "totalQty",
    key: "totalQty",
  },
  {
    title: t("Weight (g)"),
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: t("CreationDate"),
    dataIndex: "creationDate",
    key: "creationDate",
  },
  {
    title: t("Dimensions"),
    dataIndex: "dimensions",
    key: "dimensions",
  },
  {
    title: t("WarrantyDuration"),
    dataIndex: "warrantyDuration",
    key: "warrantyDuration",
  },
  {
    title: "",
    key: "actions",
    render: (_: string, record: IProduct) => {
      
      return (
        <Content style={{ display: "flex", gap: "20px" }}>
          <CreateEditDialogButton product={record} icon={<FaRegEdit/>}  buttonText={t("Edit")} variant="dashed"/>
          <OpenDeleteDialogButton product={record} />
        </Content>
      );
    },
  },
];
