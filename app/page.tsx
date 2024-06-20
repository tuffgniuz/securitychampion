import { NextPage } from "next";
import Link from "next/link";

import Container from "./lib/components/container";

const Home: NextPage = () => {
  return (
    <Container>
      <section className="-mt-20 min-h-screen flex flex-col items-center justify-center mb-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-8xl font-bold mb-5">
            Security Standards Simplified
          </h1>
          <p className="2xl:w-4/5 mb-10 text-xl text-nord-snowstorm-50 text-opacity-90">
            Solomon helps developers navigate, learn, bookmark, and manage ASVS
            requirements effortlessly — without the hassle of complex searches
            or understanding.
          </p>
          <Link
            className="bg-nord-aurora-500 p-4 rounded-lg"
            href="/requirements"
          >
            Get Started
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default Home;
