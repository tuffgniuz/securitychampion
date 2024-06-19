"use client"

import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import Topbar from "./topbar";
import Footer from "./footer";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  const pathname = usePathname();

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
          className="min-h-screen w-4/6 4xl:w-3/6 mx-auto"
        > 
          {children}
        </motion.div>
        </AnimatePresence>
      <Footer />
    </>
  )
}

export default Container;
