<<<<<<< HEAD
import { CategoryPhoto } from "./kg";

interface Site {
  c_coverPhotos?: CategoryPhoto[];
=======
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

export interface CategoryPhoto {
  name: string;
  photo: ComplexImage;
  slug?: string;
}

interface Site {
  c_coverPhoto?: ComplexImage;
>>>>>>> c30bded (home page)
  c_categoryPhotos?: CategoryPhoto[];
}

export default Site;
