import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartItem = {
  name: string;
  id: string;
  images?: string[];
  description?: string;
  unit_amount: number;
  quantity: number;
};

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toogleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  paymentIntent: string;
  setPaymentIntent: (val: string) => void;
  onCheckout: string;
  setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      // stores an array of objects containing the information about a product
      cart: [],

      // checks to see if the shopping cart is open
      isOpen: false,

      paymentIntent: "",

      onCheckout: "cart",

      // toggles the shopping cart
      toogleCart: () => set(state => ({ isOpen: !state.isOpen })),

      // adds a product to the shopping cart
      addProduct: item =>
        set(state => {
          // checks to see if a product is already in the cart
          const existingItem = state.cart.find(cartItem => cartItem.id === item.id);

          // if the product is already in the cart only update the quantity by one else add the product and give it a quantity of one
          if (existingItem) {
            const updatedCart = state.cart.map(cartItem => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),

      // reduce a product quanity by one
      removeProduct: item =>
        set(state => {
          // checks to see if a product is already in the cart
          const existingItem = state.cart.find(cartItem => cartItem.id === item.id);

          // if the product exist remove the quatity by one
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map(cartItem => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            // remove the product from cart
            const filteredCart = state.cart.filter(cartItem => cartItem.id !== item.id);
            return { cart: filteredCart };
          }
        }),
      setPaymentIntent: val => set(state => ({ paymentIntent: val })),
      setCheckout: val => set(state => ({ onCheckout: val })),
      clearCart: () => set(state => ({ cart: [] }))
    }),
    { name: "cart-store" }
  )
);
