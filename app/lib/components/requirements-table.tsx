import { LucideBookmarkPlus, LucideCheck } from "lucide-react";
import { FC } from "react";
import BookmarkButton from "./bookmark-button";

interface Props {
  subCategories: SubCategory[];
}

const RequirementsTable: FC<Props> = ({ subCategories }) => {
  return (
    <>
    {subCategories.map((sc) => (
      <div key={sc.sub_category_id} className="border border-nord-polarnight-100 rounded-lg mb-5">
        <div className="bg-nord-polarnight-100 rounded-t-lg">
          <h2 className="flex items-center gap-2 p-2 font-semibold">
            <span>
            {sc.sub_category_id}
            </span>
            {sc.sub_category_name}
          </h2>
        </div>
        <table className="text-left border-t border-nord-polarnight-100 w-full">
          <thead className="text-sm">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Description</th>
              <th className="p-2">L1</th>
              <th className="p-2">L2</th>
              <th className="p-2">L3</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {sc.requirements.map((r) => (
            <tr 
              key={r.requirement_id}
              className="
                border-t 
                border-nord-polarnight-100
                hover:bg-nord-polarnight-25
                transition-all
                duration-300
                ease-in-out
                cursor-pointer
            ">
              <td className="p-2 text-sm font-thin">{r.requirement_id}</td>
              <td className="p-2">{r.description}</td>
              <td className="p-2">{r.level1 && (<LucideCheck size={12} />)}</td>
              <td className="p-2">{r.level2 && (<LucideCheck size={12} />)}</td>
              <td className="p-2">{r.level3 && (<LucideCheck size={12} />)}</td>
              <td className="p-2"><BookmarkButton requirementId={r.requirement_id} /></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
    </>
  )
}

export default RequirementsTable;
