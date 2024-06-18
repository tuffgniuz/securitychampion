"use client"
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { LucideShieldCheck } from "lucide-react";

import { fetchAsvsData } from "./lib/utils/data";

import RequirementsTable from "./lib/components/requirements-table";
import SubCategories from "./lib/components/sub-categories";
import RequirementsSearchInput from "./lib/components/requirements-search-input";
import Container from "./lib/components/container";
import Button from "./lib/components/button";
import FloatingButton from "./lib/components/floating-button";

const Home: NextPage = () => {
  const [data, setData] = useState<Category[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

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

  const filterData = () => {
    return data.filter(category => {
      if (selectedCategory && category.category_id !== selectedCategory) return false;
      return category.sub_categories.some(subCategory => {
        if (selectedSubCategory && subCategory.sub_category_id !== selectedSubCategory) return false;
        return subCategory.requirements.some(requirement => {
          if (selectedLevel !== null && !requirement[`level${selectedLevel}`]) return false;
          return true;
        });
      });
    });
  };

  const filteredData = filterData();

  return (
    <Container>
      <RequirementsSearchInput />

      {/* Level filter buttons */}
      <div className="flex items-center gap-2 mb-5">
        {[1, 2, 3].map(level => (
          <Button
            key={level}
            icon={<LucideShieldCheck size={12} />}
            text={`Level ${level}`}
            size="md"
            active={selectedLevel === level}
            onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
          />
        ))}
      </div>

      {/* Category filter buttons */}
      <div className="flex items-center flex-wrap gap-2 mb-10">
        {data.map(c => (
          <Button
            key={c.category_id}
            icon={<span className="font-thin">{c.category_id}</span>}
            text={c.category_name}
            size="sm"
            active={selectedCategory === c.category_id}
            onClick={() => {
              setSelectedCategory(selectedCategory === c.category_id ? null : c.category_id);
              setSelectedSubCategory(null); // Reset sub-category when changing category
            }}
          />
        ))}
      </div>

      {/* Render filtered data */}
      {filteredData.map(c => (
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
          />
        </div>
      ))}
      <FloatingButton />
    </Container>
  );
};

export default Home;
