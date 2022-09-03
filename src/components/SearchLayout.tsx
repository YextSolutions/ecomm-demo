import * as React from "react";
import { useState } from "react";
import { ComplexImage } from "../types/kg";
import CoverPhoto from "./CoverPhoto";
import BeverageResults from "./search/BeverageResults";

interface SearchLayoutProps {
  coverPhoto?: ComplexImage;
  title?: string;
}

interface MobileSearchLayoutProps {
  coverPhoto?: ComplexImage;
}

// 1. Mobile Results (Results, No Filters, button at bottom)
// 2. Mobile Filters (All the Filters, Sort, button on bottom)
// 3. Desktop (Results AND Filters, no button at bottom)

const MobileSearchLayout = ({
  coverPhoto,
}: MobileSearchLayoutProps): JSX.Element => {
  return (
    <>
      {coverPhoto && <CoverPhoto image={coverPhoto} />}
      <BeverageResults />
    </>
  );
};

// TODO: Move to Search Section
const SearchLayout = ({ coverPhoto }: SearchLayoutProps): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <>
      <BeverageResults />
    </>
  );
};

export default SearchLayout;
