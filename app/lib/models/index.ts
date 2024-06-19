interface Category {
  category_id: string;
  category_name: string;
  summary: string;
  sub_categories: SubCategory[];
}

interface SubCategory {
  sub_category_id: string;
  sub_category_name: string;
  requirements: Requirement[];
}

interface Requirement {
  requirement_id: string;
  description: string;
  level1?: boolean;
  level2?: boolean;
  level3?: boolean;
}
