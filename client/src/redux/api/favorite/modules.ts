import { IProduct } from "../product/modules";

export interface IProductFavorite {
  productId: IProduct;
  isFavorite: boolean;
  _id: string;
}

export interface IFavoriteResponse {
  _id: string;
  user: string;
  products: IProductFavorite[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
