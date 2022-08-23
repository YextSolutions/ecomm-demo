export interface EntityReference {
  entityId: string;
  name: string;
}

interface BeverageCategory {
  name: string;
  c_beverages?: EntityReference[];
  c_parentCategory?: EntityReference[];
  c_subCategories?: EntityReference[];
  id: string;
}

export default BeverageCategory;
