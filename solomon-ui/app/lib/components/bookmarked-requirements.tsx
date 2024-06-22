"use client"

import { FC } from "react";
import dynamic from "next/dynamic";
import { LucideArrowRightFromLine } from "lucide-react";
import { Requirement } from "../models";

import useBookmarkedRequirements from "../hooks/useBookmarkedRequirements";

const RequirementsMasonry = dynamic(() => import("./requirements-masonry"), {
  ssr: false,
});

interface Props {
  requirements: Requirement[];
}

const BookmarkedRequirements: FC<Props> = ({ requirements }) => {
  const { bookmarkedRequirements, setBookmarkedRequirements } =
    useBookmarkedRequirements(requirements);

  const handleBookmarkChange = (requirementId: string, bookmarked: boolean) => {
    if (!bookmarked) {
      setBookmarkedRequirements((prevRequirements) =>
        prevRequirements.filter((req) => req.requirementId !== requirementId),
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          Bookmarked Requirements
          <span className="inline-flex text-xs bg-nord-snowstorm-50 text-nord-polarnight-25 rounded-full px-2 py-1">
            {bookmarkedRequirements.length}
          </span>
        </h1>
        <div>
          <button className="flex items-center gap-2 bg-nord-polarnight-25 px-4 py-1 rounded-lg">
            <LucideArrowRightFromLine size={14} />
            Export to markdown
          </button>
        </div>
      </div>
      <RequirementsMasonry
        requirements={bookmarkedRequirements}
        onBookmarkChange={handleBookmarkChange}
      />
    </>
  );
};

export default BookmarkedRequirements;
