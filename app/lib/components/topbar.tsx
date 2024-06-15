import { FC } from "react";
import Link from "next/link";
import { LucideBookmark } from "lucide-react";

const Topbar: FC = () => {
  return (
    <div className="h-12 border-b border-nord-polarnight-100 mb-10">
      <div className="h-full w-5/6 mx-auto flex items-center justify-between">
        <div>
          <h1>Solomon</h1>
        </div>
        <Link 
          href="/collection" 
          className="
            border
            border-nord-aurora-purple 
            text-nord-aurora-purple
            px-2 py-1 
            rounded-xl 
            flex 
            items-center 
            gap-2
        ">
          <LucideBookmark size={16} />
          Collection
        </Link>
      </div>
    </div>
  )
}

export default Topbar;
