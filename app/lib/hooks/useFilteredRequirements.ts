import { useMemo, useCallback } from "react";

/**
 * Custom hook to filter requirements based on the selected subcategory, level, and search query.
 * 
 * @param subCategories - List of all subcategories.
 * @param selectedSubCategory - Currently selected subcategory ID.
 * @param selectedLevel - Currently selected security level.
 * @param searchQuery - Current search query.
 * @returns Filtered subcategories and a function to filter requirements.
 */
const useFilteredRequirements = (
  subCategories: SubCategory[],
  selectedSubCategory: string | null,
  selectedLevel: number | null,
  searchQuery: string
) => {
  const lowerCaseSearchQuery = useMemo(() => searchQuery.toLowerCase(), [searchQuery]);

  const filterRequirements = useCallback(
    (requirements: Requirement[]) => {
      return requirements.filter(requirement => {
        const requirementIdLower = requirement.requirement_id.toLowerCase();
        const requirementDescriptionLower = requirement.description.toLowerCase();

        if (selectedLevel !== null && !requirement[`level${selectedLevel}`]) return false;
        if (searchQuery && !requirementIdLower.includes(lowerCaseSearchQuery) && !requirementDescriptionLower.includes(lowerCaseSearchQuery)) return false;
        return true;
      });
    },
    [selectedLevel, lowerCaseSearchQuery, searchQuery]
  );

  const filteredSubCategories = useMemo(() => {
    return selectedSubCategory
      ? subCategories.filter(sc => sc.sub_category_id === selectedSubCategory)
      : subCategories;
  }, [subCategories, selectedSubCategory]);

  return {
    filterRequirements,
    filteredSubCategories,
  };
};

export default useFilteredRequirements;

