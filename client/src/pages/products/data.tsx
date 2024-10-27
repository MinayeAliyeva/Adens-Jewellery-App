
import {  Image } from "antd";

export const columns = () =>[
    {
      title: "Ürün Resmi",
      dataIndex: "mainImageUrl",
      render: (url: string) => <Image width={100} src={url} />,
    },
    {
      title: "Ürün Adı",
      dataIndex: "productName",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Miktar",
      dataIndex: "totalQty",
    },
    {
      title: "Renk",
      dataIndex: "color",
    },
    {
      title: "Ağırlık",
      dataIndex: "weight",
      render: (weight: number) => `${weight} g`,
    },
    {
      title: "Boyut",
      dataIndex: "size",
      render: (sizes: string[]) => sizes.join(", "),
    },
    {
      title: "Açıklama",
      dataIndex: "description",
    },
    {
      title: "Garanti Süresi",
      dataIndex: "warrantyDuration",
      render: (duration: number) => `${duration} ay`,
    },
  ];