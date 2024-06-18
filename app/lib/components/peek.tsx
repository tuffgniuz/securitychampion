"use client";
import { FC, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideX } from "lucide-react";

import MarkdownContent from "./markdown-content";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  requirementId: string | null;
}

const Peek: FC<Props> = ({ isOpen, onClose, categoryName, requirementId }) => {
  const closeModal = () => {
    onClose();
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
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-end items-start z-50"
          >
            <motion.div
              key="modal"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-nord-polarnight-100 text-nord-snowstorm-50 w-1/2 4xl:w-1/2 h-full shadow-lg overflow-y-auto"
            >
              <header className="h-12 flex items-center justify-end w-4/5 4xl:2-3/5 mx-auto py-5 mb-5">
                <button onClick={closeModal}>
                  <LucideX />
                </button>
              </header>
              <div className="w-4/5 4xl:w-3/5 mx-auto">
                <p className="text-xs mb-5">Requirement {requirementId}</p>
                {/*<h2 className="mb-5 bg-nord-polarnight-25 px-2 py-1 rounded-lg inline-flex">{categoryName}</h2> */}
                <MarkdownContent requirementId={requirementId} />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Peek;
