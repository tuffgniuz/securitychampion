import { useState, useMemo } from "react";
import { Category, Requirement, SubCategory } from "../models";

/**
 * Interface representing the state and state-setters for the filtered ASVS data.
 */
interface FilteredAsvsDataState {
  /** The filtered list of categories based on selected filters. */
  filteredData: Category[];
  /** The currently selected security level. */
  selectedLevel: number | null;
  /** Function to set the selected security level. */
  setSelectedLevel: (level: number | null) => void;
  /** The currently selected category. */
  selectedCategory: string | null;
  /** Function to set the selected category. */
  setSelectedCategory: (category: string | null) => void;
  /** The currently selected sub-category. */
  selectedSubCategory: string | null;
  /** Function to set the selected sub-category. */
  setSelectedSubCategory: (subCategory: string | null) => void;
  /** The current search query. */
  searchQuery: string;
  /** Function to set the search query. */
  setSearchQuery: (query: string) => void;
}

/**
 * Custom hook to manage the state and filtering logic for ASVS data.
 *
 * @param {Category[]} categories - The list of categories to filter.
 * @returns {FilteredAsvsDataState} The state and state-setters for the filtered ASVS data.
 */
const useFilteredAsvsData = (categories: Category[]): FilteredAsvsDataState => {
  // State for selected level, category, sub-category, and search query
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  /**
   * Helper function to check if a requirement matches the search query and level.
   *
   * @param requirement - The requirement to check.
   * @param level - The selected level.
   * @param - The search query.
   * @returns True if the requirement matches, otherwise false.
   */
  const matchesRequirement = (
    requirement: Requirement,
    level: number | null,
    query: string,
  ) => {
    const levelKey = `level${level}` as keyof Requirement;
    if (level !== null && !requirement[levelKey]) return false;
    if (
      query &&
      !requirement.requirementId.includes(query) &&
      !requirement.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }
    return true;
  };

  /**
   * Helper function to check if a sub-category matches the selected sub-category and contains matching requirements.
   *
   * @param subCategory - The sub-category to check.
   * @param level - The selected level.
   * @param query - The search query.
   * @param selectedSubCategory - The selected sub-category.
   * @returns True if the sub-category matches, otherwise false.
   */
  const matchesSubCategory = (
    subCategory: SubCategory,
    level: number | null,
    query: string,
    selectedSubCategory: string | null,
  ) => {
    if (
      selectedSubCategory &&
      subCategory.subCategoryId !== selectedSubCategory
    ) {
      return false;
    }
    return subCategory.requirements.some((requirement) =>
      matchesRequirement(requirement, level, query),
    );
  };

  // Memoized filtered data based on selected criteria
  const filteredData = useMemo(() => {
    return categories.filter((category) => {
      if (selectedCategory && category.categoryId !== selectedCategory) {
        return false;
      }
      return category.subCategories.some((subCategory) =>
        matchesSubCategory(
          subCategory,
          selectedLevel,
          searchQuery,
          selectedSubCategory,
        ),
      );
    });
  }, [
    categories,
    selectedCategory,
    selectedSubCategory,
    selectedLevel,
    searchQuery,
  ]);

  return {
    filteredData,
    selectedLevel,
    setSelectedLevel,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    searchQuery,
    setSearchQuery,
  };
};

export default useFilteredAsvsData;
