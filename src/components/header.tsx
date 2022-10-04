import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";
import SearchIcon from "../icons/SearchIcon";
import LocationModal from "./LocationModal";
import { CartContext } from "./providers/CartProvider";
import { LocationContext } from "./providers/LocationsProvider";
import ScreenOverlay from "./ScreenOverlay";
import SearchBar from "./search/SearchBar";

interface HeaderProps {
  hideLocationPicker?: boolean;
}

export const Header = ({ hideLocationPicker }: HeaderProps) => {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<string | undefined>();

  const { locationState } = useContext(LocationContext);
  const { cartState } = useContext(CartContext);

  useEffect(() => {
    if (locationState.userLocation?.displayName) {
      setDeliveryAddress(locationState.userLocation?.displayName);
    }
  }, [locationState.userLocation]);

  useEffect(() => {
    if (locationModalOpen) {
      // set modal open to false after 200 milliseconds
      setTimeout(() => setLocationModalOpen(false), 200);
    }
  }, [locationState.checkedLocation?.addressLine1]);

  useEffect(() => {
    setTotalCartItems(
      cartState.cartItems
        .map((item) => item.quantity)
        .reduce((a, b) => a + b, 0)
    );
  }, [cartState]);

  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleLocationModal = () => setLocationModalOpen(!locationModalOpen);

  const renderDeliveryFromAddress = () => {
    if (locationState.checkedLocation?.addressLine1) {
      return (
        <div>
          Delivery From:
          <span className="pl-1 text-dark-orange">
            {locationState.checkedLocation?.addressLine1}
          </span>
        </div>
      );
    }
  };

  const handleClickOutOfModal = () => setLocationModalOpen(false);

  return (
    <div className="fixed top-0 z-50 w-full">
      {searchOpen && (
        <ScreenOverlay>
          <SearchBar
            customCssClasses={{
              searchBarContainer: "py-6 px-3 md:py-0 md:px-0",
            }}
          />
        </ScreenOverlay>
      )}
      <div className=" grid h-16 grid-cols-3 content-center bg-orange md:grid-cols-2">
        <div className="ml-4 flex items-center text-dark-orange">
          <AiOutlineMenu className="block md:hidden" size={30} />
          <a
            className="hidden pr-4 text-3xl font-semibold text-red md:block"
            href="/"
          >
            TOAST
          </a>
          <div className="ml-4 hidden gap-8 text-sm text-black md:flex">
            <a href="/wine">WINE</a>
            <a href="/beer">BEER</a>
            <a href="/liquor">LIQUOR</a>
            <a href="/locations">LOCATIONS</a>
            <a>OTHER</a>
          </div>
          <div className="hidden px-6 md:flex md:pt-6">
            <SearchBar />
          </div>
        </div>
        <a
          className="flex items-center justify-center text-3xl text-red md:hidden"
          href="/"
        >
          TOAST
        </a>
        <div className="mr-4 flex items-center justify-end text-dark-orange">
          <a href="/cart">
            <div className="relative">
              <FaShoppingBasket className="mr-3" size={30} />
              {totalCartItems > 0 && (
                <div className="absolute -bottom-0.5 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red text-xxs font-bold text-white">
                  {totalCartItems}
                </div>
              )}
            </div>
          </a>
          <div className="w-8 md:hidden">
            <button
              className="flex h-8 w-8 items-center"
              onClick={toggleSearch}
            >
              {searchOpen ? <AiOutlineClose size={30} /> : <SearchIcon />}
            </button>
          </div>
        </div>
      </div>
      {!hideLocationPicker && (
        <>
          <button
            className="flex h-12 w-full items-center justify-center gap-4 bg-light-orange shadow-lg"
            onClick={toggleLocationModal}
          >
            {renderDeliveryFromAddress()}
          </button>
          {locationModalOpen && (
            <LocationModal onClickOutOfModal={handleClickOutOfModal} />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
