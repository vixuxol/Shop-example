import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducer';
import { IProductDetailsState } from './constans/productDetailsConstant';
import { IProductListState } from './constans/productListConstans';
import { productDetailsReducer } from './reducers/productsDetailsReducer';


export interface RootState {
    productList: IProductListState;
    productDetails: IProductDetailsState;
}


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
});

const middleware = [thunk];

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

