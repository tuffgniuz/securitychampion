import { useState, useEffect, useMemo } from "react";

import { fetchAsvsData } from "../utils/data";

interface UseAsvsDataResult {
  data: Category[];
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
interface UseAsvsDataResult {
  data: Category[];
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

const useAsvsData = (): UseAsvsDataResult => {
  const [data, setData] = useState<Category[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAsvsData();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((category) => {
      if (selectedCategory && category.category_id !== selectedCategory)
        return false;
      return category.sub_categories.some((subCategory) => {
        if (
          selectedSubCategory &&
          subCategory.sub_category_id !== selectedSubCategory
        )
          return false;

        return subCategory.requirements.some((requirement) => {
          const levelKey = `level${selectedLevel}` as keyof Requirement;
          if (selectedLevel !== null && !requirement[levelKey]) return false;
          if (
            searchQuery &&
            !requirement.requirement_id.includes(searchQuery) &&
            !requirement.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
            return false;
          return true;
        });
      });
    });
  }, [data, selectedCategory, selectedSubCategory, selectedLevel, searchQuery]);

  return {
    data,
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

export default useAsvsData;
