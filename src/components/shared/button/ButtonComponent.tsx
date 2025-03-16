import { Button } from "@/components/ui/button";
import style from "./Button.module.css";

interface ButtonProps {
  title: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ title }) => {
  return (
    <div>
      <Button className={`${style.btn} bg-transparent hover:bg-transparent border`}>{title}</Button>
    </div>
  );
};

export default ButtonComponent;
