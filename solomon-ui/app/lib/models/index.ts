export interface Category {
  id: string;
  category_key: string;
  name: string;
  summary: string;
  sub_categories: SubCategory[];
}

export interface SubCategory {
  id: string;
  sub_category_id: string;
  name: string;
  summary?: string | null;
  requirements: Requirement[];
}

export interface Requirement {
  id: string;
  requirement_key: string;
  description: string;
  level1?: boolean;
  level2?: boolean;
  level3?: boolean;
}
