import { FC } from "react";
import Button from "./button";

interface Props {
  subCategories: SubCategory[];
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCategory: string | null) => void;
}

const SubCategories: FC<Props> = ({ subCategories, selectedSubCategory, setSelectedSubCategory }) => {
  return (
    <ul className="flex items-center flex-wrap gap-2 my-10">
      {subCategories.map(sc => (
        <li key={sc.sub_category_id}>
          <Button 
            icon={<span className="text-xs font-thin">{sc.sub_category_id}</span>}
            text={sc.sub_category_name}
            size="md"
            active={selectedSubCategory === sc.sub_category_id}
            onClick={() => setSelectedSubCategory(selectedSubCategory === sc.sub_category_id ? null : sc.sub_category_id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default SubCategories;

