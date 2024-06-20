import { NextPage } from "next";

import Container from "../lib/components/container";
import AsvsList from "../lib/components/asvs-list";

const Requirements: NextPage = () => {
  return (
    <Container>
      <AsvsList />
    </Container>
  );
};

export default Requirements;
