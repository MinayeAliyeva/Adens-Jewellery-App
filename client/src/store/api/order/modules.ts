export interface IOrderResponse {}

export interface IOrderItem {
  _id: string;
  totalQualityBuying: number;
}

export interface IUser {
 email?: string;
}

export interface IShippingAddress {
  firstName?: string;
  postalAddress: string;
}

export interface IOrderRequest {
  orderItems: IOrderItem[];
  user: IUser;
  shippingAddress: IShippingAddress;
}
