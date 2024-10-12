import { CSSProperties, FC } from "react";
import { Button } from "antd";
import { ButtonProps } from "antd";
interface IButtonProps extends ButtonProps {
  customColor?: string;
  border?: CSSProperties["border"];
  buttonText?: string;
}

export const ButtonComponent: FC<IButtonProps> = ({
  loading,
  disabled,
  icon,
  danger,
  htmlType,
  iconPosition,
  block,
  onClick,
  buttonText,
  style,
  type,
  customColor,
  border,
  color = "primary",
  variant='solid',
}) => {
  return (
    <>
      <Button
        disabled={disabled}
        variant={variant}
        danger={danger}
        icon={icon}
        loading={loading}
        iconPosition={iconPosition}
        htmlType={htmlType}
        color={color}
        onClick={onClick}
        type={type}
        block={block}
        style={{
          ...style,
          border: border, 
        }}
      >
        {buttonText}
      </Button>
    </>
  );
};
