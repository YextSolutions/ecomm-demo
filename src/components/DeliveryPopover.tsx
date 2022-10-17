import * as React from "react";
import { Fragment, useContext, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { LocationContext } from "./providers/LocationsProvider";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import GoogleLocationSearch from "./GoogleLocationSearch";
import { LocationSelectorDropdown } from "./LocationModal";
import searchConfig from "../config/searchConfig";
import classNames from "classnames";

// import {
//   ChartBarIcon,
//   CheckCircleIcon,
//   CursorArrowRaysIcon,
//   PhoneIcon,
//   PlayIcon,
//   ShieldCheckIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/24/outline";

// const solutions = [
//   {
//     name: "Analytics",
//     description:
//       "Get a better understanding of where your traffic is coming from.",
//     href: "#",
//     icon: ChartBarIcon,
//   },
//   {
//     name: "Engagement",
//     description: "Speak directly to your customers in a more meaningful way.",
//     href: "#",
//     icon: CursorArrowRaysIcon,
//   },
//   {
//     name: "Security",
//     description: "Your customers' data will be safe and secure.",
//     href: "#",
//     icon: ShieldCheckIcon,
//   },
//   {
//     name: "Integrations",
//     description: "Connect with third-party tools that you're already using.",
//     href: "#",
//     icon: Squares2X2Icon,
//   },
// ];
// const callsToAction = [
//   { name: "Watch Demo", href: "#", icon: PlayIcon },
//   { name: "View All Products", href: "#", icon: CheckCircleIcon },
//   { name: "Contact Sales", href: "#", icon: PhoneIcon },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const locationsSearcher = provideHeadless({
  ...searchConfig,
  verticalKey: "locations",
  headlessId: "location-searcher",
});

const DeliveryPopover = () => {
  const { locationState } = useContext(LocationContext);
  const [addressInputOpen, setAddressInputOpen] = useState(true);

  const handleModalButtonClick = () => setAddressInputOpen(!addressInputOpen);

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
    } else {
      return (
        <div className="text-dark-orange hover:underline">
          Choose a location near you!
        </div>
      );
    }
  };

  return (
    <Popover className="relative z-20">
      {({ open }) => (
        <>
          <div className="relative ">
            <div
              className={classNames(
                "flex w-full items-center justify-center  bg-light-orange py-4",
                { "shadow-lg": !open }
              )}
            >
              <Popover.Button className="group inline-flex items-center focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2">
                {renderDeliveryFromAddress()}
              </Popover.Button>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute inset-x-0 z-30 transform ">
              <div className="fixed -z-10  h-[calc(100vh-140px)] w-screen bg-gray-600 opacity-50"></div>
              <div className="w-full bg-white md:mx-auto md:max-w-xl ">
                <div className="grid grid-cols-2  py-4 ">
                  <button
                    className={classNames("mx-4 flex justify-center ", {
                      "border-b-2 border-dark-orange": addressInputOpen,
                    })}
                    onClick={handleModalButtonClick}
                    disabled={addressInputOpen}
                  >
                    <div>Delivery Address</div>
                  </button>
                  <button
                    className={classNames("mx-4 flex justify-center ", {
                      "border-b-2 border-dark-orange": !addressInputOpen,
                      "text-gray-400": !locationState.userLocation,
                    })}
                    onClick={handleModalButtonClick}
                    disabled={!locationState.userLocation || !addressInputOpen}
                  >
                    Available Stores
                  </button>
                </div>
                <SearchHeadlessProvider searcher={locationsSearcher}>
                  {addressInputOpen && <GoogleLocationSearch />}
                  <LocationSelectorDropdown hidden={addressInputOpen} />
                </SearchHeadlessProvider>
              </div>
              {/* <div className="fixed z-50 h-[calc(100vh-140px)] w-screen bg-gray-600 opacity-50"></div> */}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DeliveryPopover;
