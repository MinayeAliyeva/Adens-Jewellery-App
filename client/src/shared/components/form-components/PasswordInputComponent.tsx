import { FC, memo, ReactElement } from "react";
import { Input } from "antd";
import { Controller, Control } from "react-hook-form";
import { PasswordProps } from "antd/es/input";
import { LockOutlined } from "@ant-design/icons";

interface IInputProps extends PasswordProps {
  name: string;
  control: Control<any>;
  errorMessage?: ReactElement;
  labelText?: string;
  rules?: any;
}

const PasswordInputComponent: FC<IInputProps> = ({
  name,
  control,
  placeholder,
  errorMessage,
  labelText,
  prefix,
  rules = {},
  ...rest
}) => {
  return (
    <>
      {labelText && <label>{labelText}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input.Password
            placeholder={placeholder}
            {...field}
            {...rest}
            size="large"
            prefix={<LockOutlined />}
          />
        )}
      />
    </>
  );
};

export default memo(PasswordInputComponent);
