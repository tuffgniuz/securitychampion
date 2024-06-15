import { FC, ReactNode } from "react";

interface Props {
  text?: string;
  icon?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const Button: FC<Props> = ({ text, icon, size = "xs" }) => {
  return (
    <button 
      className={`
        flex 
        items-center 
        gap-2 
        bg-nord-polarnight-25 
        px-2 py-1 
        rounded-lg
        text-${size}
      `}>
      {icon && icon}
      {text && text}
    </button>
  )
}

export default Button;
