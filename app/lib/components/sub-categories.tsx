import { FC } from "react";

interface Props {
  subCategories: SubCategory[];
}

const SubCategories: FC<Props> = ({ subCategories }) => {
  return (
    <ul className="flex items-center flex-wrap gap-2 my-10">
      {subCategories.map((sc) => (
        <li>
          <button 
            className="text-xs font-semibold flex items-center gap-2 bg-nord-polarnight-25 px-2 py-2 rounded-xl"
          >
          <span className="bg-nord-polarnight-100 rounded-full p-1 text-xs">{sc.sub_category_id}</span>
          {sc.sub_category_name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default SubCategories;
