import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { LucideBookMarked, LucideGithub, LucideInfo } from "lucide-react";

interface Props {
  width?: string;
}

const Topbar: FC<Props> = ({ width }) => {
  return (
    <div className="h-20 mb-10 min-w-full">
      <div
        className={`h-full flex items-center justify-between ${width ? width : "px-10"}`}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/solomon.svg" alt="Logo" width={30} height={30} />
            <h1>Solomon</h1>
          </Link>
          <span className="bg-nord-polarnight-25 rounded-lg px-2 py-1 text-xs">
            ASVS 4.0.3
          </span>
        </div>
        <nav className="flex items-center gap-5">
          <ul className="flex items-center gap-5 border-r border-nord-snowstorm-100 border-opacity-50 pr-5">
            <li>
              <Link
                className="hover:text-nord-aurora-500 transition-colors duration-300 ease-in-out"
                href="/requirements"
              >
                Requirements
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-nord-aurora-500 transition-colors duration-300 ease-in-out flex items-center gap-2 "
                href="/collection"
              >
                Collection
                <span className="bg-nord-snowstorm-50 text-nord-polarnight-50 rounded-full inline-flex px-2">
                  0
                </span>
              </Link>
            </li>
          </ul>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href="https://github.com/tuffgniuz/solomon"
                className="inline-flex bg-nord-polarnight-25 rounded-full p-2"
              >
                <LucideGithub size={16} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Topbar;
