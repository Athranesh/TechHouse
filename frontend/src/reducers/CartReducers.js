import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types/cartTypes';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //.product is the id
      const newItem = action.payload;
      const existsItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (existsItem) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.map((item) =>
              item.product === existsItem.product ? newItem : item
            ),
          ],
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    default:
      return state;
  }
};
