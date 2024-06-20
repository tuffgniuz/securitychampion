import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { LucideBookMarked, LucideGithub, LucideInfo } from "lucide-react";

interface Props {
  width: string;
}

const Topbar: FC<Props> = ({ width }) => {
  return (
    <div className="h-16 border-b border-nord-polarnight-100 mb-10">
      <div className={`h-full flex items-center justify-between ${width}`}>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/solomon.svg" alt="Logo" width={30} height={30} />
            <h1>Solomon</h1>
          </Link>
          <span className="bg-nord-polarnight-25 rounded-lg px-2 py-1 text-xs">
            ASVS 4.0.3
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/collection"
            className="
              border
              border-nord-aurora-400 
              text-nord-aurora-400
              hover:bg-nord-aurora-400
              hover:text-nord-snowstorm-50
              transition-all 
              duration-300
              ease-in-out
              px-4 py-1
              rounded-xl 
              flex 
              items-center 
              gap-2
          "
          >
            <LucideBookMarked size={16} />
            Collection
          </Link>
          <Link href="/about" className="bg-nord-frost-300 rounded-full p-2">
            <LucideInfo size={16} />
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
  );
};

export default Topbar;
