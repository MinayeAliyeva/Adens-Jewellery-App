import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Table } from "antd";
import { columns } from "./data";
import { useTranslation } from "react-i18next";
import { IUser } from "./modules";
import {
  useLazyGetOrderByUserIdQuery,
  useUpdateOrderStatusByIdMutation,
} from "../../store/api/order/order-api";
import { OrderComponent } from "./user-order/OrderComponent";
import { IOrderResponse } from "../../store/api/order/modules";

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
  const [userOrders, setUserOrders] = useState<IOrderResponse | null>(null);
  const { t } = useTranslation();

  const [getUserorderById, { isLoading: isLoadingUserOrders }] =
    useLazyGetOrderByUserIdQuery();
  const [updateStatusByOrderId, {isLoading: isLoadingUpdate}] = useUpdateOrderStatusByIdMutation();

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
    if (userId) {
      console.log("userId", userId);
      
      getUserorderById(userId).then((res) => {
        setUserOrders(res.data!);
      });
    }
  }, [userId, isLoadingUpdate]);

  const tableColumns = useMemo(() => columns({ t }), [t]);
  const saveOrdersStatus = (orderId: string, status: string) => {
    updateStatusByOrderId({orderId,status});
  };

  const handleExpandedRowRender = useCallback(() => {
    return (
      <OrderComponent
        userOrders={userOrders!}
        isLoadingUserOrders={isLoadingUserOrders}
        saveOrdersStatus={saveOrdersStatus}
      />
    );
  }, [userOrders]);

  return (
    <Table<DataType>
      columns={tableColumns}
      expandable={{
        expandedRowRender: handleExpandedRowRender,
        rowExpandable: () => true,
        expandRowByClick: true,
        onExpand: (expanded, record) => {
          if (expanded) {
            setUserId(record._id);
          } else {
            setUserOrders(null);
            setUserId("");
          }
        },
      }}
      dataSource={tableDataSource}
    />
  );
};

export default memo(UsersTable);
