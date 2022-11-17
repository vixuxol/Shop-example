import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducer';
import { IProductDetailsState } from './constans/productDetailsConstant';
import { IProductListState } from './constans/productListConstans';
import { productDetailsReducer } from './reducers/productsDetailsReducer';
import { cartReducer } from './reducers/cartReducers';
import { ICartState, ICartItem } from './constans/cartConstans';


export interface RootState {
    productList: IProductListState;
    productDetails: IProductDetailsState;
    cart: ICartState, 
}


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

//@ts-ignore
const cartItemsFromStorage: Array<ICartItem> = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    productList: undefined,
    productDetails: undefined,
    cart: {
        cartItems: cartItemsFromStorage,
    }
};

const middleware = [thunk];

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

