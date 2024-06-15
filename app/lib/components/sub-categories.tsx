import { FC } from "react";
import Button from "./button";

interface Props {
  subCategories: SubCategory[];
}

const SubCategories: FC<Props> = ({ subCategories }) => {
  return (
    <ul className="flex items-center flex-wrap gap-1 my-10">
      {subCategories.map((sc) => (
        <li key={sc.sub_category_id}>
          <Button 
            icon={<span className="text-xs font-thin">{sc.sub_category_id}</span>}
            text={sc.sub_category_name}
            size="sm"
          />
        </li>
      ))}
    </ul>
  )
}

export default SubCategories;
