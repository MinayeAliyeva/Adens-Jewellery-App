import React, { FC } from "react";
import { Table, Popconfirm, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { Content } from "antd/es/layout/layout";

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
  {
    title: "Action",
    dataIndex: "",
    key: "action",
    render: (_, record) => (
      <Popconfirm
        title="Are you sure to delete this user?"
        onConfirm={() => handleDelete(record._id)} 
        okText="Yes"
        cancelText="No"
      >
        <a>Delete</a>
      </Popconfirm>
    ),
  },
];

const handleDelete = (id: string) => {
  console.log("User with id", id, "deleted");
};

const UsersTable: FC<{ data: any[] }> = ({ data }) => {
  return (
    <Table<DataType>
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <Content>
            <Typography style={{ margin: 0 }}>First Name: {record.firstName}</Typography>
            <Typography style={{ margin: 0 }}>Last Name: {record.lastName}</Typography>
            <Typography style={{ margin: 0 }}>Phone: {record.phone}</Typography>
            <Typography style={{ margin: 0 }}>Email: {record.email}</Typography>
          </Content>
        ),
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
