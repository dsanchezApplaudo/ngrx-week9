import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';

export class CartUtils {
  static addItemToCart = (
    cartItems: CartItem[],
    cartItemToAdd: CartItem
  ): CartItem[] => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.product_id === cartItemToAdd.product_id
    );

    if (existingCartItem) {
      return cartItems.map((cartItem) => {
        if (cartItem.product_id === cartItemToAdd.product_id) {
          const newQuantity = cartItem.quantity + cartItemToAdd.quantity;
          const newTotal = newQuantity * cartItem.price;
          return {
            ...cartItem,
            quantity: newQuantity,
            total: newTotal,
          };
        } else {
          return cartItem;
        }
      });
    }

    return [
      ...cartItems,
      {
        ...cartItemToAdd,
        quantity: cartItemToAdd.quantity,
        total: cartItemToAdd.price,
      },
    ];
  };

  static removeItemFromCart = (
    cartItems: CartItem[],
    cartItemToRemoveId: number
  ): CartItem[] => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.product_id === cartItemToRemoveId
    );

    if (existingCartItem && existingCartItem.quantity === 1) {
      return cartItems.filter(
        (cartItem) => cartItem.product_id !== cartItemToRemoveId
      );
    }

    return cartItems.map((cartItem) => {
      if (cartItem.product_id === cartItemToRemoveId) {
        const newQuantity = cartItem.quantity - 1;
        const newTotal = newQuantity * cartItem.price;
        return { ...cartItem, quantity: newQuantity, total: newTotal };
      } else {
        return cartItem;
      }
    });
  };

  static clearItem = (
    cartItems: CartItem[],
    cartItemToRemoveId: number
  ): CartItem[] => {
    return cartItems.filter(
      (cartItem) => cartItem.product_id !== cartItemToRemoveId
    );
  };
}
