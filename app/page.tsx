"use client";
import { NextPage } from "next";
import { LucideShieldCheck } from "lucide-react";

import useAsvsData from "./lib/hooks/useAsvsData";

import RequirementsTable from "./lib/components/requirements-table";
import SubCategories from "./lib/components/sub-categories";
import RequirementsSearchInput from "./lib/components/requirements-search-input";
import Container from "./lib/components/container";
import Button from "./lib/components/button";
import FloatingButton from "./lib/components/floating-button";

const Home: NextPage = () => {
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
      <Container>
        <RequirementsSearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Level filter buttons */}
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

        {/* Category filter buttons */}
        <div className="flex items-center flex-wrap gap-2 mb-10">
          {data.map((c) => (
            <Button
              key={c.category_id}
              icon={<span className="font-thin">{c.category_id}</span>}
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

        {/* Render filtered data */}
        {filteredData.map((c) => (
          <div key={c.category_id} className="mb-10">
            <h1 className="text-nord-aurora-purple text-2xl font-semibold mb-5">
              {c.category_id} {c.category_name}
            </h1>
            <p className="mb-5 text-lg">{c.summary}</p>
            <SubCategories
              subCategories={c.sub_categories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
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
      </Container>
    </>
  );
};

export default Home;
