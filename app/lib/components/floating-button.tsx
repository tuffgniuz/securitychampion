import { LucideBookMarked } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const FloatingButton: FC = () => {
  return (
    <Link 
      href="/collection"
      className="
        fixed bottom-4 
        right-4 
        bg-nord-aurora-green 
        text-white 
        p-2 
        rounded-full 
        drop-shadow-xl 
      "
    >
      <LucideBookMarked size="20" />
    </Link>
  )
}

export default FloatingButton;
