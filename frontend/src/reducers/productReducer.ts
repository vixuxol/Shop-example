import { Reducer } from 'react';

import {    IProductListState,
            PRODUCT_LIST_REQUEST, 
            PRODUCT_LIST_SUCCESS, 
            PRODUCT_LIST_FAIL,
             } from '../constans/productListConstans';

import { productListRequestAction, productListSuccessAction, productListFailAction } from '../actions/productListActions';




const initialProductListState: IProductListState = { loading: false,
                                                error: '',
                                                products: []
};

type IProductListAction = productListRequestAction | productListSuccessAction | productListFailAction;

export const productListReducer: Reducer<IProductListState, IProductListAction> = (state = initialProductListState, action) => {
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

