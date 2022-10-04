import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import Location from "../../types/locations";

// TODO: add to Pages module
const MapPin: CardComponent<Location> = ({ result }: CardProps<Location>) => {
  const [showCard, setShowCard] = useState(false);
  const { address } = result.rawData;
  return (
    <div className="relative z-10">
      <Transition
        show={showCard}
        enter="transition-opacity duration-750"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute -inset-x-24 bottom-12 z-50 h-24 w-60 gap-5 rounded-md bg-white p-4 align-middle shadow-sm shadow-stone-400/5">
          <div className="my-auto mx-auto flex flex-row">
            <div className="my-auto">
              <h3 className="text-lg font-normal">{result.name}</h3>
              <div className="font-sans text-stone-500">
                <p className="text-xs">
                  {address?.line1}, {address?.line2}
                </p>
                <p className="text-xs">
                  {address?.city}, {address?.region}, {address?.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <svg
        onMouseEnter={() => setShowCard(true)}
        onMouseLeave={() => setShowCard(false)}
        className="z-40 fill-slate-800 stroke-white stroke-2 hover:fill-slate-500"
        width="33"
        height="42"
        viewBox="0 0 30 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M30 15.0882C30 23.4212 23.3333 30.7353 15 38C7.22222 31.2941 0 23.4212 0 15.0882C0 6.75523 6.71573 0 15 0C23.2843 0 30 6.75523 30 15.0882Z" />
      </svg>
    </div>
  );
};

export default MapPin;
