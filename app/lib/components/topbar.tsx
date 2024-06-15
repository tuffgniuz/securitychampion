import { FC } from "react";
import Link from "next/link";
import { LucideBookMarked, LucideBookmark, LucideGithub } from "lucide-react";
import Image from "next/image";

const Topbar: FC = () => {
  return (
    <div className="h-12 border-b border-nord-polarnight-100 mb-10">
      <div className="h-full w-5/6 4xl:w-3/6 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/solomon.svg" alt="Logo" width={30} height={30} />
            <h1>Solomon</h1>
          </Link>
          <span className="bg-nord-polarnight-25 rounded-lg px-2 py-1 text-xs">ASVS 4.0.3</span>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/collection" 
            className="
              border
              border-nord-aurora-green 
              text-nord-aurora-green
              hover:bg-nord-aurora-green
              hover:text-nord-snowstorm-50
              transition-all 
              duration-300
              ease-in-out
              px-4 py-1
              rounded-xl 
              flex 
              items-center 
              gap-2
          ">
            <LucideBookMarked size={16} />
            Collection
          </Link>
          <Link 
            href="https://github.com/tuffgniuz/solomon"
            className="bg-nord-polarnight-25 rounded-full p-2"
          >
            <LucideGithub size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Topbar;
