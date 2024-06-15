"use client"
import { NextPage } from "next";
import { LucideArrowRightFromLine } from "lucide-react";

import useBookmarkedRequirements from "../lib/hooks/useBookmarkedRequirements";

import RequirementsMasonry from "../lib/components/requirements-masonry";
import Container from '../lib/components/container';

const CollectionPage: NextPage = () => {
  const {bookmarkedRequirements, setBookmarkedRequirements} = useBookmarkedRequirements();

  const handleBookmarkChange = (requirementId: string, bookmarked: boolean) => {
    if (!bookmarked) {
      setBookmarkedRequirements((prevRequirements) =>
        prevRequirements.filter((req) => req.requirement_id !== requirementId)
      );
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-lg font-semibold">Bookmarked Requirements</h1>
        <button className="flex items-center gap-2 bg-nord-polarnight-25 px-4 py-1 rounded-lg">
          <LucideArrowRightFromLine size={14} />Export
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
