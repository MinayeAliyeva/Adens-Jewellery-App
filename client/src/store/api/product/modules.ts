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

export interface IProduct {
  productAvailability: {
    stores: string[];
  };
  _id: string;
  productName: string;
  size: string[];
  price: number;
  category: { name: string; _id: string };
  color: string;
  comments: any[];
  mainImageUrl: string;
  additionalImages: string[];
  brand: IBrandsResponse;
  description: string;
  stock: number;
  weight: number;
  dimensions: number;
  warrantyDuration: string;
  creationDate: string;
  priceHistory: any[];
  __v: number;
}
