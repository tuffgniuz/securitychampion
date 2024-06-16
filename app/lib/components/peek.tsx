"use client";
import { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LucideX } from "lucide-react";
import MarkdownContent from "./markdown-content";

interface Props {
  categoryName: string;
  requirementId: string;
}

const Peek: FC<Props> = ({ categoryName, requirementId }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showDialog = searchParams.get("showDialog");

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(5px)" },
    exit: { opacity: 0, backdropFilter: "blur(0px)" },
  };

  const modalVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <AnimatePresence>
      {showDialog === "y" && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex justify-end items-start z-50"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-nord-polarnight-100 text-nord-snowstorm-50 w-1/2 4xl:w-1/3 h-full shadow-lg overflow-y-auto"
          >
            <header className="h-12 flex items-center justify-between px-20 py-10 mb-5">
              <span className="text-xs">Requirement {requirementId}</span>
              <button onClick={closeModal}>
                <LucideX />
              </button>
            </header>
            <div className="px-20">
              <h2 className="mb-5 bg-nord-polarnight-25 px-2 py-1 rounded-lg inline-flex">{categoryName}</h2>
              <MarkdownContent requirementId={requirementId} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Peek;
