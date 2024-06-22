"use client";
import { FC } from "react";
import { LucideShieldCheck } from "lucide-react";

import { Category } from "../models";

import RequirementsSearchInput from "./requirements-search-input";
import Button from "./button";
import SubCategories from "./sub-categories";
import RequirementsTable from "./requirements-table";
import FloatingButton from "./floating-button";

import useFilteredAsvsData from "../hooks/useFilteredAsvsData";

interface Props {
  categories: Category[];
}

const AsvsList: FC<Props> = ({ categories }) => {
  const {
    filteredData,
    selectedLevel,
    setSelectedLevel,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    searchQuery,
    setSearchQuery,
  } = useFilteredAsvsData(categories);

  return (
    <>
      <RequirementsSearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Level filter buttons */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          {[1, 2, 3].map((level) => (
            <Button
              key={level}
              icon={<LucideShieldCheck size={12} />}
              text={`Level ${level}`}
              size="md"
              active={selectedLevel === level}
              onClick={() =>
                setSelectedLevel(selectedLevel === level ? null : level)
              }
            />
          ))}
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="flex items-center flex-wrap gap-2 mb-10">
        {categories.map((c) => (
          <Button
            key={c.categoryId}
            icon={<span className="text-xs font-thin">{c.categoryId}</span>}
            text={c.name}
            size="md"
            active={selectedCategory === c.categoryId}
            onClick={() => {
              setSelectedCategory(
                selectedCategory === c.categoryId ? null : c.categoryId,
              );
              setSelectedSubCategory(null); // Reset sub-category when changing category
            }}
          />
        ))}
      </div>

      {/* hide the category name, summary and sub categories component with performing the search */}
      {/* Render filtered data */}
      {filteredData.map((c) => (
        <div key={c.categoryId} className="mb-10">
          {!searchQuery && (
            <>
              <h1 className="text-nord-aurora-500 text-2xl font-semibold mb-5">
                {c.categoryId} {c.name}
              </h1>
              <p className="mb-5">{c.summary}</p>
              <SubCategories
                subCategories={c.subCategories}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
              />
            </>
          )}
          <RequirementsTable
            subCategories={c.subCategories}
            categoryName={c.name}
            selectedSubCategory={selectedSubCategory}
            selectedLevel={selectedLevel}
            searchQuery={searchQuery}
          />
        </div>
      ))}
      <FloatingButton />
    </>
  );
};

export default AsvsList;
