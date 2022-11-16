import { Reducer } from 'react';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constans/productConstans'
import { productListRequestAction, productListSuccessAction, productListFailAction } from '../actions/productActions';


export interface IProduct {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;

}

export interface IProductState {
    loading: boolean;
    error: string;
    products: Array<IProduct>;
};

const initialProductListState: IProductState = { loading: false,
                                                error: '',
                                                products: []
};

type ProductAction = productListRequestAction | productListSuccessAction | productListFailAction;

export const productListReducers: Reducer<IProductState, ProductAction> = (state = initialProductListState, action) => {
switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true
            };

        case PRODUCT_LIST_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        
        default:
            return state;
    }
}