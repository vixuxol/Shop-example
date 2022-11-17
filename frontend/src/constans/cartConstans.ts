import { IProduct } from './productDetailsConstant';

export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';



export interface ICartItem {
    product: IProduct;
    qty: number;
}


export interface ICartState {
    cartItems: Array<ICartItem>
}