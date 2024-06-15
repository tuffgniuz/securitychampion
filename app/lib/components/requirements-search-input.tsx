import { FC } from "react";

const RequirementsSearchInput: FC = () => {
  return (
    <input 
      type="search"
      placeholder="Search ..."
      autoComplete="off"
      className="
        outline-none
        border-none
        w-full 
        bg-nord-polarnight-100 
        focus:outline
        focus:outline-1
        focus:outline-nord-aurora-purple
        transition-all
        duration-500
        ease-in-out
        mb-10
        p-2 
        rounded-xl
      "
    />
  )
}

export default RequirementsSearchInput;
