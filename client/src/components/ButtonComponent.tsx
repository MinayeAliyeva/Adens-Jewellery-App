import { Button, ButtonProps } from "antd";
import { FC } from "react";

interface IButtonComponentProps extends ButtonProps{
  buttonText: string;
}

const ButtonComponent: FC<IButtonComponentProps> = ({ buttonText, style, onClick }) => {
  return (
    <Button
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonComponent;
