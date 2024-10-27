import React, { FC, memo, useCallback, useMemo } from "react";
import { Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { columns } from "./data";
import { useTranslation } from "react-i18next";
import { IUser } from "./modules";

interface DataType {
  key: React.Key;
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const UsersTable: FC<{ data: IUser[] }> = ({ data }) => {
  const { t } = useTranslation();

  const tableDataSource = useMemo(
    () =>
      data?.map((user) => ({
        key: user._id,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || "N/A",
        email: user.email,
      })),
    [data]
  );

  const tableColumns = useMemo(() => columns({ t }), [t]);
  
  const handleExpandedRowRender = useCallback((record: DataType) => {
    return (
      <Content>
        <Typography style={{ margin: "10px 0" }}>
          <strong>{t("First Name")}:</strong> {record.firstName}
        </Typography>
        <Typography style={{ margin: "10px 0" }}>
          <strong>{t("Last Name")}:</strong> {record.lastName}
        </Typography>
        <Typography style={{ margin: "10px 0" }}>
          <strong>{t("Phone")}:</strong> {record.phone}
        </Typography>
        <Typography style={{ margin: "10px 0" }}>
          <strong>{t("Email")}:</strong> {record.email}
        </Typography>
      </Content>
    );
  }, [t]);

  return (
    <Table<DataType>
      columns={tableColumns}
      expandable={{
        expandedRowRender: handleExpandedRowRender,
      }}
      dataSource={tableDataSource}
    />
  );
};

export default memo(UsersTable);
