import { ICartItem, ICartState, CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constans/cartConstans';

import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';



//фабрика для CART_ADD_ITEM
export interface cartAddItemAction {
    type: typeof CART_ADD_ITEM;
    payload: ICartItem
}

const cartAddItem: ActionCreator<cartAddItemAction> = (payload: ICartItem) => ({
        type: CART_ADD_ITEM,
        payload
    }
)

//фабрика для CART_REMOVE_ITEM
export interface cartRemoveItemAction {
    type: typeof CART_REMOVE_ITEM;
    payload: string;
}

const cartRemoveItem: ActionCreator<cartRemoveItemAction> = (payload: string) => ({
        type: CART_REMOVE_ITEM,
        payload
    }
)


export const addToCart = (id: string, qty: Number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(cartAddItem({product: data, qty: qty})) 

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    console.log('вызвана функция')
}

export const removeFromCart = (id:string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    
    dispatch(cartRemoveItem(id)); 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}