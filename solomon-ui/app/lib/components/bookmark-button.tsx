"use client";

import { FC } from "react";
import { LucideBookmarkCheck, LucideBookmarkPlus } from "lucide-react";

import useBookmark from "../hooks/useBookmark";

interface Props {
  requirementId: string;
  onBookmarkChange?: (requirementId: string, bookmarked: boolean) => void;
}

const BookmarkButton: FC<Props> = ({ 
  requirementId,
  onBookmarkChange = () => {}
}) => {
  const { bookmarked, toggleBookmark } = useBookmark(requirementId);

  const handleBookmark = () => {
    toggleBookmark();
    onBookmarkChange(requirementId, !bookmarked);
  }
  
  return (
    <button
      onClick={handleBookmark}
      className={`
        border
        border-nord-aurora-400
        p-2 
        rounded-lg
        ${
          bookmarked
            ? "bg-nord-aurora-400 text-nord-polarnight-25"
            : "border border-nord-aurora-green text-nord-aurora-400 hover:bg-nord-aurora-400 hover:text-nord-polarnight-25 transition-colors duration-300 ease-in-out"
        }
      `}
    >
      {bookmarked && <LucideBookmarkCheck size={14} />}
      {!bookmarked && <LucideBookmarkPlus size={14} />}
    </button>
  );
};

export default BookmarkButton;
