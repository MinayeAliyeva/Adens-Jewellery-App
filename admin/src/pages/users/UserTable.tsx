import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { columns } from "./data";
import { useTranslation } from "react-i18next";
import { IUser } from "./modules";
import { useLazyGetOrderByUserIdQuery } from "../../store/api/order/order-api";
import UserOrdertable from "./userOrderTable/UserOrdertable";

interface DataType {
  key: React.Key;
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const UsersTable: FC<{ data: IUser[] }> = ({ data }) => {
  const [userId, setUserId] = useState("");
  const { t } = useTranslation();
  const [getUserorderById, { data: userOrders }] =
    useLazyGetOrderByUserIdQuery();
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
  useEffect(() => {
    if (!userId) return;
    getUserorderById(userId);
  }, [userId]);
  const tableColumns = useMemo(() => columns({ t }), [t]);

  const handleExpandedRowRender = useCallback(
    (record: DataType) => {
      setUserId(record?._id);
  

      return (
        <>
          <UserOrdertable  />
        </>
      );
    },
    [t]
  );

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
