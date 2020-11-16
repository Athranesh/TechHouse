import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../types/cartTypes';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: null },
  action
) => {
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

    case CART_REMOVE_ITEM:
      const newCartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );

      return {
        ...state,
        cartItems: newCartItems,
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
