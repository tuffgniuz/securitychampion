import { FC, ReactNode } from "react";

interface Props {
  text?: string;
  icon?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  active?: boolean;
  onClick?: () => void;
}

const Button: FC<Props> = ({ text, icon, onClick, active, size = "xs" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex 
        items-center 
        gap-2 
        bg-nord-polarnight-25 
        px-2 py-1 
        rounded-lg
        transition-all
        duration-300
        ease-in-out
        hover:bg-nord-aurora-500
        hover:text-nord-polarnight-25
        text-${size}
        ${active && "bg-nord-aurora-500 text-nord-polarnight-25"}
      `}
    >
      {icon && icon}
      {text && text}
    </button>
  );
};

export default Button;
