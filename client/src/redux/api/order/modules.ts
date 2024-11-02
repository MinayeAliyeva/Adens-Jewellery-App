import { IUser } from "../user/module";

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
//

// interface IUser {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   wishLists: any[];
//   isAdmin: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }


// interface IProduct {
//   productAvailability: IProductAvailability;
//   _id: string;
//   productName: string;
//   size: string[];
//   price: number;
//   totalQty: number;
//   totalSold: number;
//   category: string;
//   color: string;
//   comments: any[];
//   mainImageUrl: string;
//   additionalImages: string[];
//   description: string;
//   weight: number;
//   dimensions: number;
//   warrantyDuration: number;
//   creationDate: string;
//   brand: string;
//   priceHistory: any[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   lastUpdated: string;
//   averageRating: number;
//   id: string;
//}

// interface IProductItem {
//   productId: IProduct;
//   quantity: number;
//   _id: string;
// }

export interface IPayment {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
}


export interface IOrderResponse {
  success: boolean;
  orders: IOrder[];
}
