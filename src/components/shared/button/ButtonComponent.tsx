"use client"; 
import { Button } from "@/components/ui/button";
import style from "./Button.module.css";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}


const ButtonComponent: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <div>
      <Button className={`${style.btn} bg-transparent hover:bg-transparent border`}
      onClick={onClick}
      >{title}</Button>
    </div>
  );
};

export default ButtonComponent;
