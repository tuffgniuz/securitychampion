"use client";
import { FC } from "react";
import { LucideShieldCheck } from "lucide-react";

import useAsvsData from "../hooks/useAsvsData";

import RequirementsSearchInput from "./requirements-search-input";
import Button from "./button";
import SubCategories from "./sub-categories";
import RequirementsTable from "./requirements-table";
import FloatingButton from "./floating-button";

const AsvsList: FC = () => {
  const {
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
  } = useAsvsData();

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
        {data.map((c) => (
          <Button
            key={c.category_id}
            icon={<span className="text-xs font-thin">{c.category_id}</span>}
            text={c.category_name}
            size="md"
            active={selectedCategory === c.category_id}
            onClick={() => {
              setSelectedCategory(
                selectedCategory === c.category_id ? null : c.category_id,
              );
              setSelectedSubCategory(null); // Reset sub-category when changing category
            }}
          />
        ))}
      </div>

      {/* hide the category name, summary and sub categories component with performing the search */}
      {/* Render filtered data */}
      {filteredData.map((c) => (
        <div key={c.category_id} className="mb-10">
          {!searchQuery && (
            <>
              <h1 className="text-nord-aurora-500 text-2xl font-semibold mb-5">
                {c.category_id} {c.category_name}
              </h1>
              <p className="mb-5">{c.summary}</p>
              <SubCategories
                subCategories={c.sub_categories}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
              />
            </>
          )}
          <RequirementsTable
            subCategories={c.sub_categories}
            categoryName={c.category_name}
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
