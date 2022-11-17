import { Reducer } from 'redux';

import {    IProductDetailsState,
            PRODUCT_DETAILS_REQUEST, 
            PRODUCT_DETAILS_SUCCESS, 
            PRODUCT_DETAILS_FAIL} from '../constans/productDetailsConstant';

            import { productDetailsRequestAction, productDetailsSuccessAction, productDetailsFailAction } from '../actions/productDetailsActions';


const initialProductState: IProductDetailsState = { 
    loading: false,
    error: '',
    product: {
        _id: '',
        name: '',
        image: '',
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        reviews: [],
    }
    
};

type IProductAction = productDetailsRequestAction | productDetailsSuccessAction | productDetailsFailAction;

export const productDetailsReducer: Reducer<IProductDetailsState, IProductAction> = (state = initialProductState, action) => {
    switch(action.type) {
            case PRODUCT_DETAILS_REQUEST:
                return {
                    ...state,
                    loading: true
                };
    
            case PRODUCT_DETAILS_SUCCESS:
                // console.log(action.payload)
                return {
                    ...state,
                    loading: false,
                    product: action.payload,
                };
    
            case PRODUCT_DETAILS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
            
            default:
                return state;
        }
    }