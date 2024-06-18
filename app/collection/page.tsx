"use client";
import { NextPage } from "next";
import { LucideArrowRightFromLine } from "lucide-react";

import exportToMarkdown from "../lib/utils/exportToMarkdown";
import useBookmarkedRequirements from "../lib/hooks/useBookmarkedRequirements";

import RequirementsMasonry from "../lib/components/requirements-masonry";
import Container from "../lib/components/container";

const CollectionPage: NextPage = () => {
  const { bookmarkedRequirements, setBookmarkedRequirements } = useBookmarkedRequirements();

  const handleBookmarkChange = (requirementId: string, bookmarked: boolean) => {
    if (!bookmarked) {
      setBookmarkedRequirements((prevRequirements) =>
        prevRequirements.filter((req) => req.requirement_id !== requirementId)
      );
    }
  };

  const handleExportToMarkdown = () => {
    const markdownContent = exportToMarkdown(bookmarkedRequirements);

    // Create a Blob from the Markdown content
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarked-requirements.md';
    document.body.appendChild(a);
    a.click();

    // Clean up the URL and remove the anchor element
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          Bookmarked Requirements
          <span className="inline-flex text-xs bg-nord-snowstorm-50 text-nord-polarnight-25 rounded-full px-2 py-1">
            {bookmarkedRequirements.length}
          </span>
        </h1>
        <button 
          className="flex items-center gap-2 bg-nord-polarnight-25 px-4 py-1 rounded-lg"
          onClick={handleExportToMarkdown}
        >
          <LucideArrowRightFromLine size={14} />
          Export to markdown
        </button>
      </div>
      <RequirementsMasonry
        requirements={bookmarkedRequirements}
        onBookmarkChange={handleBookmarkChange}
      />
    </Container>
  );
};

export default CollectionPage;
