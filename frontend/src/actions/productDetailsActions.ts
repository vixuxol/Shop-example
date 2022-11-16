import {    IProduct,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL} from '../constans/productDetailsConstant';

import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';



//фабрика для PRODUCT_LIST_REQUEST
export interface productDetailsRequestAction {
    type: typeof PRODUCT_DETAILS_REQUEST;
}

const productDetailsRequest: ActionCreator<productDetailsRequestAction> = () => ({
        type: PRODUCT_DETAILS_REQUEST,
    }
)

//фабрика для PRODUCT_LIST_SUCCESS
export interface productDetailsSuccessAction {
    type: typeof PRODUCT_DETAILS_SUCCESS;
    payload: IProduct;
}

const productDetailsSuccess: ActionCreator<productDetailsSuccessAction> = (payload: IProduct) => ({
        type: PRODUCT_DETAILS_SUCCESS,
        payload
    }
)

//фабрика для PRODUCT_LIST_FAIL
export interface productDetailsFailAction {
    type: typeof PRODUCT_DETAILS_FAIL;
    error: string;
}

const productDetailsFail: ActionCreator<productDetailsFailAction> = (error: string) => ({
        type: PRODUCT_DETAILS_FAIL,
        error
    }
)

export const listProductDetails = (id: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
        dispatch(productDetailsRequest());
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch(productDetailsSuccess(data));
    } catch (error) {
        dispatch(productDetailsFail(String(error)))
    }
}