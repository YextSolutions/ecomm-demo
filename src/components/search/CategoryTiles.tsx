import * as React from "react";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { CategoryLink } from "../../types/kg";

interface CategoryTilesProps {
  title?: string;
  categories: CategoryLink[];
}

const CategoryTiles = ({ title, categories }: CategoryTilesProps) => {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const outerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outerContainerRef.current) {
      outerContainerRef.current.scrollHeight >
        outerContainerRef.current.clientHeight && setCanExpand(true);
    }
  }, [outerContainerRef.current?.clientHeight]);

  const handleChange = (expand: boolean) => {
    outerContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setExpanded(expand);
  };

  return (
    <div className="py-8">
      <span className="font-bold">{title}</span>
      <div
        ref={outerContainerRef}
        className={classNames(
          "transition-max-h mt-6 flex flex-wrap overflow-hidden px-4 duration-200 ease-linear md:px-0",
          {
            "max-h-32 md:max-h-28": !expanded,
            "max-h-72 overflow-y-scroll": expanded,
          }
        )}
      >
        {categories.map((category) => (
          <a key={uuid()} href={category.slug}>
            <div className="mr-3 mb-3 flex w-fit items-center border border-orange bg-light-orange md:hover:bg-orange">
              <div className="px-6 py-1 md:px-3 md:text-xs">
                {category.name}
              </div>
            </div>
          </a>
        ))}
      </div>
      {canExpand && (
        <div className="flex w-full justify-center pt-2">
          <button onClick={() => handleChange(!expanded)}>
            <span className="text-sm text-dark-orange hover:underline">
              {expanded ? "Show Less" : "Show More"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryTiles;
