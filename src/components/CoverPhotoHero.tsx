import * as React from "react";
import { ComplexImageType, Image, ImageType } from "@yext/pages/components";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import SearchPanel from "./search/SearchPanel";
import { Transition } from "@headlessui/react";

interface CoverPhotoHeroProps {
  coverPhotos: ComplexImageType[] | ImageType[];
}

const CoverPhotoHero = ({ coverPhotos }: CoverPhotoHeroProps) => {
  const [showSearch, setShowSearch] = React.useState(false);

  // use effect hook that sets showSearch to true 300 milliseconds after the component mounts
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSearch(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative max-h-[900px] min-h-[600px] w-full">
      {coverPhotos.map((coverPhoto, index) => {
        return (
          <div
            key={uuid()}
            className={classNames(`absolute top-0 bottom-0 left-0 right-0 `, {
              "z-50": index === 0,
              "z-40": index === 1,
              "z-30": index === 2,
              "z-20": index === 3,
              "z-10": index === 4,
            })}
          >
            <Image
              image={coverPhoto}
              className={`max-h-full min-h-full min-w-full max-w-full animate-fade-in-out`}
              style={{
                animationDelay: `${index * 6700}ms`,
              }}
            />
          </div>
        );
      })}
      <Transition
        show={showSearch}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <SearchPanel />
      </Transition>
    </div>
  );
};

export default CoverPhotoHero;
