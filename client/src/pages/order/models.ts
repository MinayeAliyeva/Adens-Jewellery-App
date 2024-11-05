import { IProduct } from "../../redux/api/product/models";
import { IUser } from "../../redux/api/user/module";

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

export interface IProductItem {
  productId: any;
  quantity: number;
}


export interface IProductItems {
  productId: IProduct;
  quantity: number;
}


export interface IOrder {
  payment: IPayment;
  _id: string;
  userId: IUser;
  productItems: IProductItems[];
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
   orders: IOrder[] ;
}
