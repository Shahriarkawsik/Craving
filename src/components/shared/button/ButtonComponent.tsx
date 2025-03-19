import { Button } from "@/components/ui/button";
import style from "./Button.module.css";
interface ButtonProps {
  title: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ title }) => {
  return (
    <div>
      <Button
        variant="outline"
        className={`${style.btn} bg-transparent hover:bg-transparent`}
      >
        {title}
      </Button>
    </div>
  );
};

export default ButtonComponent;
