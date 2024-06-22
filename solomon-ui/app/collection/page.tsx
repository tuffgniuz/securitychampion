import { NextPage } from "next";

import Container from "../lib/components/container";
import BookmarkedRequirements from "../lib/components/bookmarked-requirements";
import prisma from "@/prisma/client";

const CollectionPage: NextPage = async () => {
  const requirements = await prisma.requirement.findMany();

  return (
    <Container width="px-10">
      <BookmarkedRequirements requirements={requirements} />
    </Container>
  );
};

export default CollectionPage;
