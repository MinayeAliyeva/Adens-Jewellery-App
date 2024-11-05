import { IBrandsResponse } from "../brand/models";
import { ICatagoryResponse } from "../catagory/models";

export interface IComment {
  body: Array<{
    content: string;
    rating: number;
  }>;
  username: string;
  userId: string;
}
export interface IProduct {
  productAvailability: {
    stores: string[];
  };
  _id: string;
  productName: string;
  size: string[];
  price: number;
  brand: IBrandsResponse;
  category: ICatagoryResponse;
  color: string;
  comments: any[];
  mainImageUrl: string;
  additionalImages: string[];
  description: string;
  totalQty: number;
  weight: number;
  dimensions: number;
  warrantyDuration: string;
  creationDate: string;
  priceHistory: any[];
  __v: number;
}
