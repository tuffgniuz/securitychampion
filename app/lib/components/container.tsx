"use client";

import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import Topbar from "./topbar";
import Footer from "./footer";

interface Props {
  children: ReactNode;
  width?: string;
}

const Container: FC<Props> = ({ children, width }) => {
  const pathname = usePathname();
  const containerWidth = "w-5/6 2xl:w-3/5 4xl:w-2/6 mx-auto";

  return (
    <>
      <Topbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen ${width ? width : containerWidth}`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Container;
