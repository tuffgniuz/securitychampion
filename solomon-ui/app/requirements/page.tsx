import { NextPage } from "next";

import Container from "../lib/components/container";
import AsvsList from "../lib/components/asvs-list";
import { getCategoriesWithRelations } from "../lib/actions";

const Requirements: NextPage = async () => {
  const categories = await getCategoriesWithRelations();

  return (
    <Container>
      <AsvsList categories={categories} />
    </Container>
  );
};

export default Requirements;
