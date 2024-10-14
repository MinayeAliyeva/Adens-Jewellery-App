export interface IComment {
  body: Array<{
    content: string;
    rating: number;
  }>;
  username: string;
  userId: string;
}
export interface IBrandsResponse {
  name: string;
  _id: string;
}
interface Brand {
  _id: string;
  name: string;
  __v: number;
}
interface ProductAvailability {
  stores: any[];
}
export interface IProduct {
  productAvailability: ProductAvailability;
  _id: string;
  productName: string;
  size: string[];
  price: number;
  category?: any;
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
  brand: Brand;
  priceHistory: any[];
  __v: number;
  lastUpdated: string;
}
