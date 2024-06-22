import { useState, useMemo } from "react";

import { Category, Requirement, SubCategory } from "../models";

interface UseFilteredAsvsDataResult {
  filteredData: Category[];
  selectedLevel: number | null;
  setSelectedLevel: (level: number | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCategory: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const useFilteredAsvsData = (
  categories: Category[],
): UseFilteredAsvsDataResult => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    return categories.filter((category) => {
      if (selectedCategory && category.categoryId !== selectedCategory)
        return false;
      return category.subCategories.some((subCategory: SubCategory) => {
        if (
          selectedSubCategory &&
          subCategory.subCategoryId !== selectedSubCategory
        )
          return false;

        return subCategory.requirements.some((requirement) => {
          const levelKey = `level${selectedLevel}` as keyof Requirement;
          if (selectedLevel !== null && !requirement[levelKey]) return false;
          if (
            searchQuery &&
            !requirement.requirementId.includes(searchQuery) &&
            !requirement.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
            return false;
          return true;
        });
      });
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
