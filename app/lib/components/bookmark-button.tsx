"use client";

import { FC, useEffect, useState } from "react";
import { LucideBookmarkCheck, LucideBookmarkPlus } from "lucide-react";

interface Props {
  requirementId: string;
  onBookmarkChange?: (requirementId: string, bookmarked: boolean) => void; // Make it optional
}

const BookmarkButton: FC<Props> = ({ requirementId, onBookmarkChange = () => {} }) => { // Provide default no-op function
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarked(bookmarks.includes(requirementId));
  }, [requirementId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (bookmarks.includes(requirementId)) {
      const newBookmarks = bookmarks.filter(
        (id: string) => id !== requirementId,
      );
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      setBookmarked(false);
      onBookmarkChange(requirementId, false);
    } else {
      bookmarks.push(requirementId);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarked(true);
      onBookmarkChange(requirementId, true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`
        border
        border-nord-aurora-green
        p-2 
        rounded-lg
        ${bookmarked ? "bg-nord-aurora-green text-nord-polarnight-25" : "border border-nord-aurora-green text-nord-aurora-green hover:bg-nord-aurora-green hover:text-nord-polarnight-25 transition-colors duration-300 ease-in-out"}
      `}
    >
      {bookmarked && <LucideBookmarkCheck size={14} />}
      {!bookmarked && <LucideBookmarkPlus size={14} />}
    </button>
  );
};

export default BookmarkButton;
