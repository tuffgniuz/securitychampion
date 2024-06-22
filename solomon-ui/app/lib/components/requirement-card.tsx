import { FC } from "react";
import { LucideShieldCheck } from "lucide-react";

import { Requirement } from "../models";

import BookmarkButton from "./bookmark-button";

interface Props {
  requirement: Requirement;
  onBookmarkChange: (requirementId: string, bookmarked: boolean) => void;
}

const RequirementCard: FC<Props> = ({ requirement, onBookmarkChange }) => {
  return (
    <div className="bg-nord-polarnight-100 p-4 rounded-lg cursor-pointer">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xs font-thin">
          Requirement {requirement.requirementId}
        </h1>
        <BookmarkButton
          requirementId={requirement.requirementId}
          onBookmarkChange={onBookmarkChange}
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-5 text-xs">
          {requirement.level1 && (
            <span className="flex items-center gap-2 bg-nord-polarnight-25 px-2 py-1 rounded-lg">
              <LucideShieldCheck size={12} />
              Level 1
            </span>
          )}
          {requirement.level2 && (
            <span className="flex items-center gap-2 bg-nord-polarnight-25 px-2 py-1 rounded-lg">
              <LucideShieldCheck size={12} />
              Level 2
            </span>
          )}
          {requirement.level3 && (
            <span className="flex items-center gap-2 bg-nord-polarnight-25 px-2 py-1 rounded-lg">
              <LucideShieldCheck size={12} />
              Level 3
            </span>
          )}
        </div>
      </div>
      <p>{requirement.description}</p>
    </div>
  );
};

export default RequirementCard;
