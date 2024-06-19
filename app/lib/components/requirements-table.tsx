import { FC } from "react";
import { LucideCheck } from "lucide-react";

import useFilteredRequirements from "../hooks/useFilteredRequirements";

import BookmarkButton from "./bookmark-button";
import Peek from "./peek";
import usePeek from "../hooks/usePeek";

interface Props {
  subCategories: SubCategory[];
  categoryName: string;
  selectedSubCategory: string | null;
  selectedLevel: number | null;
  searchQuery: string;
}

const RequirementsTable: FC<Props> = ({
  subCategories,
  categoryName,
  selectedSubCategory,
  selectedLevel,
  searchQuery,
}) => {
  const { filterRequirements, filteredSubCategories } = useFilteredRequirements(
    subCategories,
    selectedSubCategory,
    selectedLevel,
    searchQuery,
  );
  const { peekIsVisible, selectedRequirementId, handleRowClick, closePeek } =
    usePeek();

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          className="bg-nord-aurora-300 text-nord-polarnight-50"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      {filteredSubCategories.map((sc) => {
        const filteredRequirements = filterRequirements(sc.requirements);
        // Exclude tables with no matching requirements
        if (filteredRequirements.length === 0) return null;

        return (
          <div
            key={sc.sub_category_id}
            className="border border-nord-polarnight-100 rounded-lg mb-5 shadow-md"
          >
            <div className="bg-nord-polarnight-100 rounded-t-lg">
              <h2 className="flex items-center gap-2 p-2 font-semibold">
                <span>{sc.sub_category_id}</span>
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
                {filteredRequirements.map((r) => (
                  <tr
                    key={r.requirement_id}
                    className="border-t border-nord-polarnight-100 hover:bg-nord-polarnight-25 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <td className="p-2 text-sm font-thin">
                      {highlightText(r.requirement_id, searchQuery)}
                    </td>
                    <td
                      className="p-2"
                      onClick={() => handleRowClick(r.requirement_id)}
                    >
                      {highlightText(r.description, searchQuery)}
                    </td>
                    <td className="p-2">
                      {r.level1 && <LucideCheck size={12} />}
                    </td>
                    <td className="p-2">
                      {r.level2 && <LucideCheck size={12} />}
                    </td>
                    <td className="p-2">
                      {r.level3 && <LucideCheck size={12} />}
                    </td>
                    <td className="p-2">
                      <BookmarkButton requirementId={r.requirement_id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
      {peekIsVisible && (
        <Peek
          isOpen={peekIsVisible}
          onClose={closePeek}
          requirementId={selectedRequirementId}
          categoryName={categoryName}
        />
      )}
    </>
  );
};

export default RequirementsTable;
