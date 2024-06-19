import { useEffect, useState } from "react";

import { getBookmarkedRequirements } from "../utils/bookmark";

const useBookmarkedRequirements = () => {
  const [bookmarkedRequirements, setBookmarkedRequirements] = useState<
    Requirement[]
  >([]);

  useEffect(() => {
    (async () => {
      const requirements = await getBookmarkedRequirements();
      setBookmarkedRequirements(requirements);
    })();
  }, []);

  return { bookmarkedRequirements, setBookmarkedRequirements };
};

export default useBookmarkedRequirements;
