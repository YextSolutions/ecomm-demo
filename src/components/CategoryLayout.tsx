import * as React from "react";
import { Image } from "@yext/pages/components";
<<<<<<< HEAD
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from "uuid";
import { CategoryPhoto } from "../types/kg";
=======

import { twMerge } from "tailwind-merge";
import { CategoryPhoto } from "../types/Site";
import { v4 as uuid } from "uuid";
>>>>>>> c30bded (home page)

interface CategoryContainerProps {
  categoryPhotos: CategoryPhoto[];
  containerCss?: string;
  title?: string;
}

const CategoryLayout = ({
  categoryPhotos,
  containerCss,
  title,
}: CategoryContainerProps): JSX.Element => {
  return (
    <>
      <div className="py-4 ">
<<<<<<< HEAD
        <span className="text-4xl font-extrabold text-dark-orange">
=======
        <span className="text-2xl font-extrabold text-dark-orange">
>>>>>>> c30bded (home page)
          {title}
        </span>
        <div
          className={twMerge(
            "grid grid-cols-2 justify-items-center gap-2 py-4",
            containerCss
          )}
        >
          {categoryPhotos.map((catPhoto) => (
            <a
              key={uuid()}
              className="group flex flex-col items-center hover:cursor-pointer"
              href={catPhoto.slug}
            >
              <div className="flex h-44 w-40">
                <Image layout="fill" image={catPhoto.photo} />
              </div>
              <div className="pt-1.5 text-blue group-hover:underline">
                {catPhoto.name.toUpperCase()}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryLayout;
