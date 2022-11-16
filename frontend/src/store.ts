import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IProduct, IProductState, productListReducers } from './reducers/productReducers';


export interface RootState {
    productList: IProductState
}


// const initialState: RootState = {
//     productList: {
//         loading: false,
//         error: '',
//         products: []
//     }
// };

const reducer = combineReducers({
    productList: productListReducers,
});

const middleware = [thunk];

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

