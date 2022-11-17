import { ICartState, CART_ADD_ITEM } from '../constans/cartConstans';
import { cartAddItemAction, cartRemoveItemAction } from '../actions/cartActions';

const InitialCartState: ICartState = {
    cartItems: []
}

type ICartActions = cartAddItemAction;

export const cartReducer = (state = InitialCartState, action: ICartActions ) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product);
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
        
            default:
                return state
    }
}