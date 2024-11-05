import { IProduct } from "../product/models";

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
