import { EntityReference } from "./beverages";
import { CategoryPhoto } from "./kg";

interface BeverageCategory {
  name: string;
  c_beverages?: EntityReference[];
  c_parentCategory?: EntityReference[];
  c_subCategories?: EntityReference[];
  c_categoryPhotos?: CategoryPhoto[];
  slug?: string;
  id: string;
}

export default BeverageCategory;
