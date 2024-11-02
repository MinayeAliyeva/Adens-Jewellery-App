import { IUser } from "../admin/admin-api";

export interface IOrderItem {
  _id: string;
  totalQualityBuying: number;
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

interface IProductItem {
  productId: string;
  quantity: number;
}

interface IOrder {
  payment: IPayment;
  _id: string;
  userId: IUser;
  productItems: IProductItem[];
  shippingAddress: string;
  totalAmount: number;
  status: "pending" | "fulfilled" | "shipped" | "delivered" | "cancelled";
  shippingFee: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IOrderRequestArg {
  productItems: IProductItem[];
  shippingAddress: string;
  userId: string;
  payment: IPayment;
  shippingFee: number;
}

export interface IPayment {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
}

export interface IOrderResponse {
  success: boolean;
  orders: IOrder[];
}
