import { NextPage } from "next";
import Link from "next/link";

import Container from "./lib/components/container";

const Home: NextPage = () => {
  return (
    <Container width="w-11/12 2xl:w-3/5 4xl:w-2/5 mx-auto">
      <section className="-mt-20 min-h-screen flex flex-col items-center justify-center mb-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl lg:text-8xl font-bold mb-8">
            Security Standards Simplified
          </h1>
          <p className="mb-10 text-md lg:text-xl text-nord-snowstorm-50 text-opacity-90">
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
