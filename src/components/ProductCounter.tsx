import * as React from "react";
import { useContext, useState } from "react";
import Counter from "./Counter";
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
    cartState.cartItems.find((item) => item.cartVariant.id === cartVariant.id)
      ?.quantity ?? 1
  );

  const handleDisplaySumChange = (quantity: number) => {
    setDisplaySum(displaySum + quantity);
  };

  const handleAddToCart = () => {
    dispatch({
      type: CartActionTypes.AddItem,
      payload: { cartVariant, quantity: displaySum },
    });
  };

  return (
    <>
      <Counter
        count={displaySum}
        handleCountChange={handleDisplaySumChange}
        minusDisabled={displaySum === 1}
      />
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
