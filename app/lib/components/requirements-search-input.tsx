import { FC, ChangeEvent } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RequirementsSearchInput: FC<Props> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="search"
      placeholder="Search requirement id or description ..."
      value={searchQuery}
      onChange={handleInputChange}
      autoComplete="off"
      className="
        outline-none
        border-none
        w-full 
        bg-nord-polarnight-100 
        focus:outline
        focus:outline-1
        focus:outline-nord-aurora-500
        transition-all
        duration-500
        ease-in-out
        mb-10
        p-4
        rounded-xl
      "
    />
  );
};

export default RequirementsSearchInput;
