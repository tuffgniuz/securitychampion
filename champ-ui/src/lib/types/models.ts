export interface Category {
  id: string;
  name: string;
  summary: string;
  sub_categories?: SubCategory[];
  requirements?: Requirement[];
}

export interface SubCategory {
  id: string;
  name: string;
  requirements?: Requirement[];
}

export interface Requirement {
  id: string;
  requirement_id: string;
  description: string;
  level1: boolean;
  level2: boolean;
  level3: boolean;
}
