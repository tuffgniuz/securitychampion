import { NextPage } from "next";

import Container from "../lib/components/container";
import AsvsList from "../lib/components/asvs-list";
import prisma from "@/prisma/client";

const Requirements: NextPage = async () => {
  const categories = await prisma.category.findMany({
    include: {
      subCategories: {
        include: {
          requirements: true,
        },
      },
    },
  });

  return (
    <Container>
      <AsvsList categories={categories} />
    </Container>
  );
};

export default Requirements;
