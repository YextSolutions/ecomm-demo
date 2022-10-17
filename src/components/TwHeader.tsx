import * as React from "react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
// import {
//   ArrowPathIcon,
//   Bars3Icon,
//   ChartBarIcon,
//   CursorArrowRaysIcon,
//   DocumentChartBarIcon,
//   ShieldCheckIcon,
//   Squares2X2Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import LocationModal from "./LocationModal";
import { LocationContext } from "./providers/LocationsProvider";
import DeliveryPopover from "./DeliveryPopover";
import { FaShoppingBasket } from "react-icons/fa";
import { CartContext } from "./providers/CartProvider";

const solutions = [
  {
    name: "Beer",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/beer",
    // icon: ChartBarIcon,
  },
  {
    name: "Wine",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "/wine",
    // icon: CursorArrowRaysIcon,
  },
  {
    name: "Liquor",
    description: "Your customers' data will be safe and secure.",
    href: "/liquor",
    // icon: ShieldCheckIcon,
  },
  {
    name: "Locations",
    description: "Connect with third-party tools that you're already using.",
    href: "/locations",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface HeaderProps {
  hideLocationPicker?: boolean;
}

const Header = ({ hideLocationPicker }: HeaderProps) => {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const { cartState } = useContext(CartContext);

  useEffect(() => {
    setTotalCartItems(
      cartState.cartItems
        .map((item) => item.quantity)
        .reduce((a, b) => a + b, 0)
    );
  }, [cartState]);

  return (
    <>
      <Popover className="relative bg-orange">
        <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 ">
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-red hover:bg-light-orange  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red">
              <span className="sr-only">Open menu</span>
              <AiOutlineMenu className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div>
            <a className="flex" href="/">
              <span className="sr-only">Toast</span>
              <p className="text-3xl font-semibold text-red md:block">TOAST</p>
            </a>
          </div>
          <div className="md:hidden ">
            <a href="/cart">
              <div className="relative">
                <FaShoppingBasket className="mr-3 text-red" size={30} />
                {totalCartItems > 0 && (
                  <div className="absolute -bottom-0.5 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red text-xxs font-bold text-white">
                    {totalCartItems}
                  </div>
                )}
              </div>
            </a>
          </div>

          {/* <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-gray-900" : "text-gray-500",
                      "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    )}
                  >
                    <span>Solutions</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                            >
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                <item.icon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="bg-gray-50 p-5 sm:p-8">
                          <a
                            href="#"
                            className="-m-3 flow-root rounded-md p-3 hover:bg-gray-100"
                          >
                            <div className="flex items-center">
                              <div className="text-base font-medium text-gray-900">
                                Enterprise
                              </div>
                              <span className="ml-3 inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium leading-5 text-indigo-800">
                                New
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Empower your entire team with even more advanced
                              tools.
                            </p>
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Docs
            </a> */}

          {/* <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-gray-900" : "text-gray-500",
                      "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    )}
                  >
                    <span>More</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 block rounded-md p-3 hover:bg-gray-50"
                            >
                              <p className="text-base font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.description}
                              </p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover> */}
          {/* </Popover.Group> */}
          {/* <div className="flex items-center md:ml-12">
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="#"
              className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign up
            </a>
          </div> */}
          {/* </div> */}
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-50 origin-top-left transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg  bg-light-orange shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <a className="flex" href="/">
                      <span className="sr-only">Toast</span>
                      <p className="text-3xl font-semibold text-red md:block">
                        TOAST
                      </p>
                    </a>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red">
                      <span className="sr-only">Close menu</span>
                      <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-6">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg py-3 "
                      >
                        {/* <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div> */}
                        <div className="ml-4 text-base font-bold text-gray-900">
                          {item.name}
                        </div>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      {!hideLocationPicker && <DeliveryPopover />}
    </>
  );
};

export default Header;
