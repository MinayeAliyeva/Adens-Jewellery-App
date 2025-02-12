import { IProduct } from "../product/models";

export interface IProductInBasket {
    productId: IProduct;
    quantity: number;
    price: number;
    _id: string;
};

export interface IAddBasaketBody {
    productId: string;
    userId: string;
    quantity: number;
}

export interface IBasketResponse {
    _id: string;
    user: string;
    products: IProductInBasket[];
    totalPrice: number;
    __v: number;
};






