import { NextPage } from "next";

import Container from "../lib/components/container";

const About: NextPage = () => {
  return (
    <Container>
      <h1 className="text-xl text-nord-aurora-500 font-semibold mb-5">
        What is Solomon?
      </h1>
      <p className="mb-5">
        Solomon is an open-source tool and a personal endeavor dedicated to
        streamlining the process of navigating and understanding the Application
        Security Verification Standard (ASVS). The mission of Solomon is to make
        it easier for professionals to find, filter, and comprehend ASVS
        requirements, ensuring robust application security across projects.
      </p>

      <h2 className="mb-5 text-nord-frost-100 font-semibold">
        What Solomon Offers
      </h2>
      <ul className="list-disc mb-5">
        <li className="mb-2">
          <strong>Search and Filter:</strong> Quickly find ASVS requirements by
          security level, category, or subcategory, saving time and effort.
        </li>
        <li className="mb-2">
          <strong>Bookmarking:</strong> Easily bookmark specific requirements
          for quick reference, ensuring easy return to important sections.
        </li>
        <li className="mb-2">
          <strong>Educational Context:</strong> Gain a deeper understanding of
          each ASVS requirement with detailed explanations and context provided
          alongside, helping to apply security best practices effectively.
        </li>
      </ul>
    </Container>
  );
};

export default About;
