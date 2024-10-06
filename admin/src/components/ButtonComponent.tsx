import { FC } from "react";
import { Button } from "antd";
import { ButtonProps } from "antd";
interface IButtonProps extends ButtonProps {
  customColor?: string;
  buttonText?: string;
}

export const ButtonComponent: FC<IButtonProps> = ({
  loading,
  icon,
  danger,
  htmlType,
  iconPosition,
  block,
  onClick,
  buttonText,
  style,
  type="primary",
}) => {
  return (
    <>
      <Button
        danger={danger}
        icon={icon}
        loading={loading}
        iconPosition={iconPosition}
        htmlType={htmlType}
        style={style}
        onClick={onClick}
        type={type}
        block={block}
      >
        {buttonText}
      </Button>
    </>
  );
};
