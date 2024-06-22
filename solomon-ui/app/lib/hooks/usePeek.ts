import { useState, useCallback } from "react";

/**
 * Custom hook to manage the visibility of the Peek component and the selected requirement ID.
 * 
 * @returns Peek visibility state, selected requirement ID, and functions to handle row click and close the Peek.
 */
const usePeek = () => {
  const [peekIsVisible, setPeekIsVisible] = useState<boolean>(false);
  const [selectedRequirementId, setSelectedRequirementId] = useState<string | null>(null);

  const handleRowClick = useCallback((requirementId: string) => {
    setPeekIsVisible(true);
    setSelectedRequirementId(requirementId);
  }, []);

  const closePeek = useCallback(() => {
    setPeekIsVisible(false);
    setSelectedRequirementId(null);
  }, []);

  return {
    peekIsVisible,
    selectedRequirementId,
    handleRowClick,
    closePeek,
  };
};

export default usePeek;
