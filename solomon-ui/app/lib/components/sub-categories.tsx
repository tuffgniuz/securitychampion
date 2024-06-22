import { FC } from "react";

import { SubCategory } from "../models";

import Button from "./button";

interface Props {
  subCategories: SubCategory[];
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCategory: string | null) => void;
}

const SubCategories: FC<Props> = ({
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
}) => {
  return (
    <ul className="flex items-center flex-wrap gap-2 my-10">
      {subCategories.map((sc) => (
        <li key={sc.subCategoryId}>
          <Button
            icon={<span className="text-xs font-thin">{sc.subCategoryId}</span>}
            text={sc.name}
            size="md"
            active={selectedSubCategory === sc.subCategoryId}
            onClick={() =>
              setSelectedSubCategory(
                selectedSubCategory === sc.subCategoryId
                  ? null
                  : sc.subCategoryId,
              )
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default SubCategories;
