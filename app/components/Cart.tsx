"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import basket from "@/public/basket.png";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

export default function Cart() {
  const cartStore = useCartStore();
  // console.log(cartStore.isOpen);

  // total price of all the products
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => cartStore.toogleCart()} className="fixed w-full h-screen left-0 top-0 bg-black/25">
      {/* Cart */}
      <motion.div layout onClick={e => e.stopPropagation()} className="bg-base-200 absolute right-0 top-0 h-screen p-12 overflow-y-scroll  w-full lg:w-2/5">
        {cartStore.onCheckout === "cart" && (
          <button onClick={() => cartStore.toogleCart()} className="text-sm font-bold pb-12">
            Back to store 🏃‍♂️{" "}
          </button>
        )}

        {cartStore.onCheckout === "checkout" && (
          <button onClick={() => cartStore.setCheckout("cart")} className="text-sm font-bold pb-12">
            Check your cart 🛒
          </button>
        )}

        {/* Cart Items */}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map(item => (
              <motion.div layout className="flex p-4 my-4 rounded-lg gap-4 bg-base-100" key={item.id}>
                <Image src={item.image} alt={item.name} width={120} height={120} className="rounded-md h-24" />
                <motion.div layout>
                  <h2>{item.name}</h2>
                  {/* Update quantity of a product */}
                  <div className="flex gap-2">
                    <h2>Quanity: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
                </motion.div>
              </motion.div>
            ))}
          </>
        )}

        {/* total and checkout */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button onClick={() => cartStore.setCheckout("checkout")} className="py-2 mt-4 bg-primary w-full rounded-md text-white">
              Checkout
            </button>
          </motion.div>
        ) : null}

        {/* Checkout Form */}
        {cartStore.onCheckout === "checkout" && <Checkout />}

        {/* Order confirmation */}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}

        {/* if no product exist in the shopping cart */}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
            <motion.div initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }} animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }} exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }} className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
              <h1>Uhh ohhh... it's empty 😢</h1>
              <Image src={basket} alt="empty cart" width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
