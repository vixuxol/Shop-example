import { legacy_createStore as createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducer';
import { IProductDetailsState } from './constans/productDetailsConstant';
import { IProductListState } from './constans/productListConstans';
import { productDetailsReducer } from './reducers/productsDetailsReducer';
import { cartReducer } from './reducers/cartReducers';
import { ICartState, ICartItem } from './constans/cartConstans';
import { userLoginReducer } from './reducers/userReducer';
import { IUserState } from './constans/userConstans';


export interface RootState {
    productList: IProductListState;
    productDetails: IProductDetailsState;
    cart: ICartState, 
    userLogin: IUserState,
}


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
});

//@ts-ignore
const cartItemsFromStorage: Array<ICartItem> = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

//@ts-ignore
const userInfoFromStorage: object = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    productList: undefined,
    productDetails: undefined,
    cart: {
        cartItems: cartItemsFromStorage,
    },
    userLogin: {
        loading: false,
        error: '',
        userInfo: userInfoFromStorage
    }
};

const middleware = [thunk];

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

