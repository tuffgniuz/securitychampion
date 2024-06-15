import Image from "next/image";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="h-40 border-t border-nord-polarnight-100 mt-10 p-10">
      <div className="h-full w-1/3 mx-auto flex flex-col justify-center items-center">
        <div className="flex items-center gap-2 mb-5">
          <Image src="/solomon.svg" alt="logo" width={32} height={32} />
          <h1>Solomon</h1>
        </div>
        <p className="text-sm">
          developed by Imanuel Febie aka <a href="https://github.com/tuffgniuz" className="text-nord-frost-50">@tuffgniuz</a>
        </p>
      </div>
    </div>
  )
}

export default Footer;
