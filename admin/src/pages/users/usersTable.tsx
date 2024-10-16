import React, { FC, useState } from "react";
import { Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { Content } from "antd/es/layout/layout";
import { useGetBasketByUserIdQuery } from "../../store/api/basket/basket-api";

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
  const{data: userBasketData}= useGetBasketByUserIdQuery({id: userId});

  return (
    <Table<DataType>
      columns={columns}
      
      expandable={{
        expandedRowRender: (record) =>{
          setUserId(record._id);
          return  (
            <Content>
              <Typography style={{ margin: 0 }}>First Name: {record.firstName}</Typography>
              <Typography style={{ margin: 0 }}>Last Name: {record.lastName}</Typography>
              <Typography style={{ margin: 0 }}>Phone: {record.phone}</Typography>
              <Typography style={{ margin: 0 }}>Email: {record.email}</Typography>
            </Content>
          )
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
