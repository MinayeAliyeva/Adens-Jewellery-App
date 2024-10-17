import { Button, ButtonProps } from "antd";
import { FC, ReactNode } from "react";

interface IButtonComponentProps extends ButtonProps {
  buttonText?: string;
  icon?: ReactNode;
}

const ButtonComponent: FC<IButtonComponentProps> = ({
  buttonText,
  style,
  onClick,
  icon,
  size = "large",
}) => {
  return (
    <Button
      style={{
        ...style,
      }}
      onClick={onClick}
      icon={icon}
      size={size}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonComponent;
