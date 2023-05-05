"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import basket from "@/public/basket.png";

export default function Cart() {
  const cartStore = useCartStore();
  // console.log(cartStore.isOpen);

  // total price of all the products
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <div onClick={() => cartStore.toogleCart()} className="fixed w-full h-screen left-0 top-0 bg-black/25">
      <div onClick={e => e.stopPropagation()} className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700">
        <h1>Here's your shopping list 📜 </h1>
        {cartStore.cart.map(item => (
          <div className="flex py-4 gap-4" key={item.id}>
            <Image src={item.image} alt={item.name} width={120} height={120} className="rounded-md h-24" />
            <div>
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
            </div>
          </div>
        ))}

        {/* checkout and total */}
        {cartStore.cart.length > 0 && <p>Total: {formatPrice(totalPrice)}</p>}

        {/* if a product exist in the shopping cart */}
        {cartStore.cart.length > 0 && <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">Checkout</button>}

        {/* if no product exist in the shopping cart */}
        {!cartStore.cart.length && (
          <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
            <h1>Uhh ohhh... it's empty 😢</h1>
            <Image src={basket} alt="empty cart" width={200} height={200} />
          </div>
        )}
      </div>
    </div>
  );
}
