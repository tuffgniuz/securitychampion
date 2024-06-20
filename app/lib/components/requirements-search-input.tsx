import { LucideSearch } from "lucide-react";
import { FC, ChangeEvent, useRef, useEffect, useState } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RequirementsSearchInput: FC<Props> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setShowInput(true);
        inputRef.current?.focus();
      } else if (event.key === "Escape") {
        setShowInput(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {showInput ? (
        <input
          ref={inputRef}
          type="search"
          placeholder="Search requirement id or description..."
          value={searchQuery}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
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
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="
            outline-none
            border-none
            w-full 
            bg-nord-polarnight-100 
            transition-all
            duration-500
            ease-in-out
            mb-10
            p-4
            rounded-xl
            text-nord-snowstorm-50 text-opacity-50
            flex items-center justify-between
            hover:bg-nord-polarnight-200
            cursor-pointer
          "
        >
          <span className="flex items-center gap-2 text-nord-snowstorm-50 text-opacity-50">
            <LucideSearch />
            Search requirements...
          </span>
          <span>Ctrl+K</span>
        </button>
      )}
    </>
  );
};

export default RequirementsSearchInput;
