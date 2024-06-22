import { useEffect, useState } from "react";

import { Requirement } from "../models";
import { getBookmarkedRequirements } from "../utils/bookmark";

const useBookmarkedRequirements = (requirements: Requirement[]) => {
  const [bookmarkedRequirements, setBookmarkedRequirements] = useState<
    Requirement[]
  >([]);

  useEffect(() => {
    (async () => {
      const bookmarked = await getBookmarkedRequirements(requirements);
      setBookmarkedRequirements(bookmarked);
    })();
  }, []);

  return { bookmarkedRequirements, setBookmarkedRequirements };
};

export default useBookmarkedRequirements;
