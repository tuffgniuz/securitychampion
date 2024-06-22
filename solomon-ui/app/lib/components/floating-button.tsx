import { FC } from "react";
import { LucideArrowUp } from "lucide-react";

const FloatingButton: FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="
        fixed bottom-4 
        right-4 
        bg-nord-aurora-400 
        text-white 
        p-2
        rounded-full 
        drop-shadow-xl 
      "
    >
      <LucideArrowUp size="20" />
    </button>
  );
};

export default FloatingButton;
