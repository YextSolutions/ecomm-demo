import { ComplexImage } from "./beverages";
import { CategoryPhoto } from "./kg";

interface Site {
  c_coverPhotos?: CategoryPhoto[];
  c_categoryPhotos?: CategoryPhoto[];
  c_homePhotos?: ComplexImage[];
}

export default Site;
