import * as React from "react";
import { useContext, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  CartActionTypes,
  CartContext,
  CartVariant,
} from "./providers/CartProvider";

export interface ProductCounterProps {
  cartVariant: CartVariant;
}

const ProductCounter = ({ cartVariant }: ProductCounterProps) => {
  const { cartState, dispatch } = useContext(CartContext);
  const [displaySum, setDisplaySum] = useState(
    cartState.cartItems.find(
      (item) => item.cartVariant.variantId === cartVariant.variantId
    )?.quantity ?? 1
  );

  const handleDisplaySumChange = (quantity: number) => {
    setDisplaySum(displaySum + quantity);
  };

  const handleAddToCart = () => {
    console.log("add to cart");
    dispatch({
      type: CartActionTypes.AddItem,
      payload: { cartVariant, quantity: displaySum },
    });
  };

  return (
    <>
      <div className="flex h-10 w-28 border">
        <button
          className="flex w-1/3 items-center justify-center disabled:opacity-30"
          disabled={displaySum === 1}
          onClick={() => handleDisplaySumChange(-1)}
        >
          <AiOutlineMinus size={24} />
        </button>
        <div className="text-xlreacreac flex w-1/3 items-center justify-center">
          {displaySum}
        </div>
        <button
          className="flex w-1/3 items-center justify-center"
          onClick={() => handleDisplaySumChange(1)}
        >
          <AiOutlinePlus size={24} />
        </button>
      </div>
      <button
        className="ml-6 h-10 w-52 rounded bg-blue"
        onClick={() => handleAddToCart()}
      >
        <p className="text-center text-base font-bold text-white">
          ADD TO CART - ${(cartVariant.price * displaySum).toFixed(2)}
        </p>
      </button>
    </>
  );
};

export default ProductCounter;
