import { IProduct } from "./productDetailsConstant";

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';




export interface IProductListState {
    loading: boolean;
    error: string;
    products: Array<IProduct>;
};