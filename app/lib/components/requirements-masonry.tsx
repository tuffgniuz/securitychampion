"use client"

import { Masonry } from "masonic";
import { FC, useState } from "react";

import RequirementCard from "./requirement-card";

interface Props {
  requirements: Requirement[];
  onBookmarkChange: (requirementId: string, bookmarked: boolean) => void;
}

const RequirementsMasonry: FC<Props> = ({ requirements, onBookmarkChange }) => {
  const [key, setKey] = useState(0)

  const handleBookmarkChange = (requirementId: string, bookmarked: boolean) => {
    onBookmarkChange(requirementId, bookmarked);
    setKey((prevKey) => prevKey +1)
  }
  
  return (
    <Masonry
      key={key}
      items={requirements}
      columnGutter={10}
      columnWidth={350}
      render={({ data }) => (
        <RequirementCard 
          key={data.requirement_id} 
          requirement={data} 
          onBookmarkChange={handleBookmarkChange}
        />
      )}
    />
  )
}

export default RequirementsMasonry;
