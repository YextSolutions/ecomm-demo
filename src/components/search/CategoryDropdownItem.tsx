import { DropdownItem, renderHighlightedValue } from "@yext/search-ui-react";
import { HighlightedValue } from "@yext/search-headless-react";
import * as React from "react";

// TODO: add slug to props once it's added to beverage_categories and handle click
interface BeverageCategoryDropdownProps {
  name: string;
  title?: string | Partial<HighlightedValue>;
}

const CategoryDropdownItem = ({
  name,
  title,
}: BeverageCategoryDropdownProps): JSX.Element => {
  return (
    <DropdownItem
      value={name}
      // onClick={() => searchHandler(categoryUrl)}
    >
      <div className="hover:bg-toast-gray py-1.5 px-10">
        {title
          ? renderHighlightedValue(title, {
              nonHighlighted: "text-black text-base ",
              highlighted: "text-dark-orange text-base font-black",
            })
          : name}
      </div>
      <div className="bg-gray mx-2.5 h-0.5" />
    </DropdownItem>
  );
};

export default CategoryDropdownItem;
