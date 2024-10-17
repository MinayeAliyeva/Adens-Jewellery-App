import React, { FC, useState } from "react";
import { List, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { Content } from "antd/es/layout/layout";
import { useGetBasketByUserIdQuery } from "../../store/api/basket/basket-api";

interface IProduct {
  productId: any;
  quantity: number;
  price: number;
  _id: string;
}

interface IBasket {
  _id: string;
  user: string;
  products: IProduct[];
  totalPrice: number;
  __v: number;
}

interface DataType {
  key: React.Key;
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "First Name", dataIndex: "firstName", key: "firstName" },
  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Email", dataIndex: "email", key: "email" },
];

const UsersTable: FC<{ data: any[] }> = ({ data }) => {
  const [userId, setUserId] = useState<string>("");
  const { data: userBasketData } = useGetBasketByUserIdQuery<{ data: IBasket }>(
    { id: userId }
  );
  console.log("userBasketData", userBasketData?.products);

  return (
    <Table<DataType>
      columns={columns}
      expandable={{
        expandedRowRender: (record) => {
          setUserId(record._id);

          return (
            <Content>
              <Typography style={{ margin: "10px 0" }}>
                <strong>First Name:</strong> {record.firstName}
              </Typography>
              <Typography style={{ margin: "10px 0" }}>
                <strong>Last Name:</strong> {record.lastName}
              </Typography>
              <Typography style={{ margin: "10px 0" }}>
                <strong>Phone:</strong> {record.phone}
              </Typography>
              <Typography style={{ margin: "10px 0" }}>
                <strong>Email:</strong> {record.email}
              </Typography>
            </Content>
          );
        },
      }}
      dataSource={data?.map((user) => ({
        key: user._id,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || "N/A",
        email: user.email,
      }))}
    />
  );
};

export default UsersTable;
