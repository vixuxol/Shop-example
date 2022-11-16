import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constans/productConstans';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IProduct } from '../reducers/productReducers';
import { RootState } from '../store';
import axios from 'axios';


//фабрика для PRODUCT_LIST_REQUEST
export interface productListRequestAction {
    type: typeof PRODUCT_LIST_REQUEST;
}

const productListRequest: ActionCreator<productListRequestAction> = () => ({
        type: PRODUCT_LIST_REQUEST,
    }
)

//фабрика для PRODUCT_LIST_SUCCESS
export interface productListSuccessAction {
    type: typeof PRODUCT_LIST_SUCCESS;
    payload: Array<IProduct>;
}

const productListSuccess: ActionCreator<productListSuccessAction> = (payload: Array<IProduct>) => ({
        type: PRODUCT_LIST_SUCCESS,
        payload
    }
)

//фабрика для PRODUCT_LIST_FAIL
export interface productListFailAction {
    type: typeof PRODUCT_LIST_FAIL;
    error: string;
}

const productListFail: ActionCreator<productListFailAction> = (error: string) => ({
        type: PRODUCT_LIST_FAIL,
        error
    }
)

export const listProducts = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
        dispatch(productListRequest());
        const { data } = await axios.get('/api/products/');
        dispatch(productListSuccess(data));
    } catch (error) {
        dispatch(productListFail(String(error)))
    }
}