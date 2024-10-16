import React, { FC, useEffect } from "react";
import { Card, Image, Table, Typography } from "antd";
import { useLazyGetProductsQuery } from "../../store/api/product/product-api";

const { Title } = Typography;

const data = [
  {
    productAvailability: { stores: [] },
    _id: "670d93e58d305a5e3b6f7e55",
    productName: "Lewis Parrish",
    size: ["M"],
    price: 292,
    totalQty: 95,
    totalSold: 0,
    category: {
      _id: "670aa1fa601e63305170d07f",
      name: "ct1",
      brand: "6706e34b24e4d186dc2e9aec",
      __v: 0,
    },
    color: "Fuga Assumenda null",
    mainImageUrl:
      "http://localhost:8080/public/images/1728943077350_banner-30.jpg",
    additionalImages: [
      "http://localhost:8080/public/images/1728943077353_banner-29-1.jpg",
      "http://localhost:8080/public/images/1728943077354_banner-30.jpg",
    ],
    description: "Sunt esse sapiente e",
    weight: 96,
    dimensions: 32,
    warrantyDuration: 7,
    brand: {
      _id: "6706e34b24e4d186dc2e9aec",
      name: "brand7s",
      __v: 0,
    },
  },
  {
    productAvailability: { stores: [] },
    _id: "670f4c5d62501a6e44a414f4",
    productName: "Steven Mullen",
    size: ["L", "M"],
    price: 367,
    totalQty: 656,
    totalSold: 0,
    category: {
      _id: "670aa23b601e63305170d09e",
      name: "ct1787787",
      brand: "6706f72cbf3ddcdfd3104dc2",
      __v: 0,
    },
    color: "Unde blanditiis dolo",
    mainImageUrl:
      "http://localhost:8080/public/images/1729055837453_banner-29-1.jpg",
    additionalImages: [
      "http://localhost:8080/public/images/1729055837454_pro-21.jpg",
      "http://localhost:8080/public/images/1729055837458_pro-25.jpg",
    ],
    description: "Obcaecati suscipit u",
    weight: 21,
    dimensions: 85,
    warrantyDuration: 54,
    brand: {
      _id: "6706e35624e4d186dc2e9aef",
      name: "brand8",
      __v: 0,
    },
  },
];

const Products: FC = () => {
  const columns = [
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
  const [getProducts, { data: productsData }] = useLazyGetProductsQuery();

  useEffect(() => {
    getProducts('');
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <Table
        columns={columns}
        dataSource={productsData}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default Products;
