import React, { FC, useState } from "react";
import { Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { columns } from "./data";
import { useTranslation } from "react-i18next";

interface DataType {
  key: React.Key;
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const UsersTable: FC<{ data: any[] }> = ({ data }) => {
  const [userId, setUserId] = useState<string>("");
  const { t } = useTranslation();
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
