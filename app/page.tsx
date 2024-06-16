import { LucideKanbanSquare, LucideShieldCheck, LucideTable } from "lucide-react";

import RequirementsTable from "./lib/components/requirements-table";
import SubCategories from "./lib/components/sub-categories";

import { fetchAsvsData } from "./lib/utils/data";
import RequirementsSearchInput from "./lib/components/requirements-search-input";
import Container from "./lib/components/container";
import Button from "./lib/components/button";
import FloatingButton from "./lib/components/floating-button";


const Home = async () => {
  const data: Category[] = await fetchAsvsData();
  
  return (
    <Container>
      <RequirementsSearchInput />

      {/* TODO: level buttons to filter requirements by level */}
      <div className="flex items-center gap-2 mb-5">
        <Button
          icon={<LucideShieldCheck size={12} />}
          text="Level 1"
          size="sm"
        />
        <Button
          icon={<LucideShieldCheck size={12} />}
          text="Level 2"
          size="sm"
        />
        <Button
          icon={<LucideShieldCheck size={12} />}
          text="Level 3"
          size="sm"
        />
      </div>

      {/* TODO: category buttons for filtering */}
      <div className="flex items-center flex-wrap gap-2 mb-10">
        {data.map((c) => (
          <Button
            icon={<span className="font-thin">{c.category_id}</span>}
            text={c.category_name}
            size="sm"
          />
        ))}
      </div>

      {/* TODO: Choose how the requirements must be renderes: table or masonry */}
      <div className="flex items-center gap-2 mb-10">
        <button><LucideTable /></button>
        <button><LucideKanbanSquare /></button>
      </div>

      {/* Render asvs data */}
      {data.map((c) => (
        <div key={c.category_id} className="mb-10">
          <h1 className="text-nord-aurora-purple flex gap-2 text-lg font-semibold mb-5">
            <span className="rounded-full">{c.category_id}</span>
            {c.category_name}
          </h1>
          <p className="mb-5">{c.summary}</p>
          <SubCategories subCategories={c.sub_categories} />
          {/* TODO: Render requirements table or requirements masonry view */}
          <RequirementsTable subCategories={c.sub_categories} categoryName={c.category_name} />
          {/* <RequirementsMasonry /> */}
        </div>
      ))} 
      <FloatingButton />
    </Container>
  );
}

export default Home;
