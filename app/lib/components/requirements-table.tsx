import { FC, useState } from "react";
import { LucideCheck, LucideChevronDown, LucideChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import useFilteredRequirements from "../hooks/useFilteredRequirements";
import usePeek from "../hooks/usePeek";

import BookmarkButton from "./bookmark-button";
import Peek from "./peek";

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
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

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

        const isCollapsed = collapsed[sc.sub_category_id];

        return (
          <div
            key={sc.sub_category_id}
            className="border border-nord-polarnight-100 rounded-lg mb-5 shadow-md"
          >
            <div className="bg-nord-polarnight-100 p-2 rounded-t-lg">
              <div
                onClick={() => toggleCollapse(sc.sub_category_id)}
                className="mb-2 flex justify-between cursor-pointer"
              >
                <h2 className="text-nord-frost-100 flex items-center gap-2 font-semibold">
                  <span>{sc.sub_category_id}</span>
                  {sc.sub_category_name}
                </h2>
                {isCollapsed ? (
                  <LucideChevronDown size={20} />
                ) : (
                  <LucideChevronUp size={20} />
                )}
              </div>
              <p className="font-thin">{sc?.summary}</p>
            </div>
            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
              )}
            </AnimatePresence>
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
