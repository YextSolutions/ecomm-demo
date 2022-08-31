import * as React from "react";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";
import SearchIcon from "../icons/SearchIcon";
import ScreenOverlay from "./ScreenOverlay";
import SearchBar from "./search/SearchBar";

export const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <div className="fixed top-0 w-full">
      {searchOpen && (
        <ScreenOverlay>
          <SearchBar />
        </ScreenOverlay>
      )}
      <div className=" grid h-16 grid-cols-3 content-center bg-orange md:grid-cols-2">
        <div className="ml-4 flex items-center text-dark-orange">
          <AiOutlineMenu className="block md:hidden" size={30} />
          {/* TODO: add links to search pages after they exist */}
          <a className="hidden pr-4 text-3xl font-semibold text-red md:block">
            TOAST
          </a>
          <div className="ml-4 hidden gap-8 text-sm text-black md:flex">
            <a href="/wine">WINE</a>
            <a href="/beer">BEER</a>
            <a href="/liquor">LIQUOR</a>
            <a>OTHER</a>
          </div>
          <div className="hidden px-6 md:flex md:pt-6">
            <SearchBar />
          </div>
        </div>
        <div className="flex items-center justify-center text-3xl text-red md:hidden">
          TOAST
        </div>
        <div className="mr-4 flex items-center justify-end text-dark-orange">
          <FaShoppingBasket className="mr-3" size={30} />
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
      <div className="flex h-12 w-full items-center justify-center bg-light-orange shadow-lg">
        <span>
          Deliver to <span className="text-dark-orange">61 9th Ave</span>
        </span>
      </div>
    </div>
  );
};

export default Header;
