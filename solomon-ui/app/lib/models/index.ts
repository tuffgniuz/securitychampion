export interface Category {
  id: string;
  categoryId: string;
  name: string;
  summary: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  subCategoryId: string;
  name: string;
  summary?: string | null;
  requirements: Requirement[];
}

export interface Requirement {
  id: string;
  requirementId: string;
  description: string;
  level1?: boolean;
  level2?: boolean;
  level3?: boolean;
}
