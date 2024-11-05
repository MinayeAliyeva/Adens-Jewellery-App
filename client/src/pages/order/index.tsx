import React, { Suspense, lazy, useEffect } from "react";
import { Card, message, Spin } from "antd";
import { useDeleteOrderByIdsMutation, useLazyGetOrderByUserIdQuery } from "../../redux/api/order/order-api";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { IDecodedValue } from "../../shared/models";
import { isEmpty } from 'lodash';

const OrderDetails = lazy(() => import("./OrderDetails"));

export const OrderComponent = () => {
  const userData: IDecodedValue | null = getUserFromToken();
  const [getOrderByUserId, { data: userOrders }] = useLazyGetOrderByUserIdQuery();
  const [deleteOrderById,{isLoading: isLoadingDeleteOrderById}] = useDeleteOrderByIdsMutation();


  useEffect(() => {
    getOrderByUserId(userData?._id!);
  }, [userData?._id, isLoadingDeleteOrderById]);

  const deleteOrder = (orderId: string) => {
    deleteOrderById(orderId).then(() => {
      message.success(`${orderId} order deleted successfully`);
    });
  }

  return (
    <Card style={{ backgroundColor: "#f4f6f8", padding: "40px", border: "none" }}>
      <Suspense fallback={<Spin style={{ display: "flex", justifyContent: "center" }} />}>
        {isEmpty(userOrders)  ? (
          <Spin style={{ display: "flex", justifyContent: "center" }} />
        ) : (
          <OrderDetails userOrders={userOrders} deleteOrderById={deleteOrder}/>
        )}
      </Suspense>
    </Card>
  );
};
