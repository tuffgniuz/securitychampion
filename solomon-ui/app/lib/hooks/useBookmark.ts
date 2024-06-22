import { useCallback, useEffect, useState } from "react";

import { addBookmark, isBookmarked, removeBookmark } from "../utils/bookmark";

const useBookmark = (requirementId: string) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    setBookmarked(isBookmarked(requirementId));
  }, [requirementId]);

  const toggleBookmark = useCallback(() => {
    if (bookmarked) {
      removeBookmark(requirementId);
      setBookmarked(false);
    } else {
      addBookmark(requirementId);
      setBookmarked(true);
    }
  }, [bookmarked, requirementId]);

  return { bookmarked, toggleBookmark };
};

export default useBookmark;
