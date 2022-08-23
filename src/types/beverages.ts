export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export enum C_tag {
  TRENDING = "Trending",
  BEST_SELLER = "Best Seller",
  GIFT = "Gift",
}

export interface Beverage {
  primaryPhoto?: ComplexImage;
  description?: string;
  name: string;
  c_abv?: number;
  c_beverageCategories?: EntityReference[];
  c_originCountry?: string;
  c_price?: number;
  c_rating?: number;
  c_tag?: C_tag;
  c_transformedPhoto?: Image;
  c_usState?: string;
  c_variantBeverages?: EntityReference[];
  id: string;
}
