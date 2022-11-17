import { ICartState, CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constans/cartConstans';
import { cartAddItemAction, cartRemoveItemAction } from '../actions/cartActions';
import { Reducer } from 'redux';

const InitialCartState: ICartState = {
    cartItems: []
}

type ICartActions = cartAddItemAction | cartRemoveItemAction;

export const cartReducer: Reducer<ICartState, ICartActions> = (state = InitialCartState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => JSON.stringify(x.product) === JSON.stringify(item.product));
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)
                }
                
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x=>x.product._id !== action.payload)
            }
        
            default:
                return state
    }
}