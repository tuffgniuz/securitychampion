import { FC } from "react";
import Link from "next/link";
import { LucideBookMarked } from "lucide-react";

interface Props {
  totalBookmarked: number;
}

const FloatingButton: FC<Props> = ({ totalBookmarked }) => {
  return (
    <Link 
      href="/collection"
      className="
        fixed bottom-4 
        right-4 
        bg-nord-aurora-green 
        text-white 
        px-4
        py-2
        rounded-xl 
        drop-shadow-xl 
        flex
        items-center 
        gap-2
      "
    >

      <LucideBookMarked size="20" />
      <span 
        className="
          inline-flex
          bg-nord-snowstorm-50 
          text-nord-aurora-green
          font-semibold
          px-1
          rounded-full
        ">
        0
      </span>
    </Link>
  )
}

export default FloatingButton;
