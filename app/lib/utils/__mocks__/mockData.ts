export const mockData: Category[] = [
  {
    category_id: "cat1",
    category_name: "Category 1",
    summary: "Summary of Category 1",
    sub_categories: [
      {
        sub_category_id: "subcat1",
        sub_category_name: "SubCategory 1",
        requirements: [
          { requirement_id: "V1.1.1", description: "Requirement 1" },
          { requirement_id: "V1.1.2", description: "Requirement 2" },
        ],
      },
      {
        sub_category_id: "subcat2",
        sub_category_name: "SubCategory 2",
        requirements: [
          { requirement_id: "V1.1.3", description: "Requirement 3" },
          { requirement_id: "V1.1.4", description: "Requirement 4" },
        ],
      },
    ],
  },
  {
    category_id: "cat2",
    category_name: "Category 2",
    summary: "Summary of Category 2",
    sub_categories: [
      {
        sub_category_id: "subcat3",
        sub_category_name: "SubCategory 3",
        requirements: [
          { requirement_id: "V1.1.5", description: "Requirement 5" },
          { requirement_id: "V1.1.6", description: "Requirement 6" },
        ],
      },
    ],
  },
];
