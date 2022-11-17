import { Direction, SortBy, SortType } from "@yext/search-headless-react";

const searchConfig = {
  apiKey: "10a44dca245f5fd3faba055fd4d28e1d",
  experienceKey: "toast",
  locale: "en",
};

export const beverageSortConfig: Record<
  string,
  { label: string; sortBy: SortBy }
> = {
  alpha_asc: {
    label: "Name: A-Z",
    sortBy: {
      field: "name",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
  alpha_desc: {
    label: "Name: Z-A",
    sortBy: {
      field: "name",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
  price_desc: {
    label: "Price: High to Low",
    sortBy: {
      field: "c_variantBeverages.c_price",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
  price_asc: {
    label: "Price: Low to High",
    sortBy: {
      field: "c_variantBeverages.c_price",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
};

export default searchConfig;
