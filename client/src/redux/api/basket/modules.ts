import { IProduct } from "../product/modules";

export interface IProductInBasket {
    productId: IProduct;
    quantity: number;
    price: number;
    _id: string;
};

export interface IBasketResponse {
    _id: string;
    user: string;
    products: IProductInBasket[];
    totalPrice: number;
    __v: number;
};



