import { Avatar, List } from "antd";
import { FC, memo } from "react";
import { IProductItems } from "../../../store/api/order/modules";
interface DataType {
  productName: string;
  quantity: number;
  price: number;
  picture: string;
}

const OrderProductListComponent: FC<{
  data: IProductItems[];
  isLoadingUserOrders: boolean;
}> = ({ data, isLoadingUserOrders }) => {
  const tranformedData: DataType[] = data?.map((item: any) => {
    return {
      productName: item?.productId?.productName,
      quantity: item?.quantity,
      price: item?.productId?.price,
      picture: item.productId?.mainImageUrl,
    };
  });

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={tranformedData}
      renderItem={(item: any) => (
        <List.Item>
          <>
            <List.Item.Meta
              avatar={<Avatar src={item?.picture} />}
              description={item?.productName}
            />
            <div style={{ display: "flex", gap: "15px" }}>
              <span>Quantity:{item?.quantity}</span>|
              <span>Price:{item?.price}$</span>|
              <span>Total:{item?.price * item?.quantity}$</span>
            </div>
          </>
        </List.Item>
      )}
    />
  );
};

export default memo(OrderProductListComponent);
