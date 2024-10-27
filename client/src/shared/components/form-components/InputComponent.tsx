import { FC, memo, ReactElement } from "react";
import { Input, InputProps } from "antd";
import { Controller, Control } from "react-hook-form";

interface IInputProps extends InputProps {
  name: string;
  control: Control<any>;
  errorMessage?: ReactElement;
  labelText?: string;
  rules?: any; 
}

const InputComponent: FC<IInputProps> = ({
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
          <Input
            prefix={prefix}
            placeholder={placeholder}
            {...field}
            {...rest}
          />
        )}
      />
    </>
  );
};

export default memo(InputComponent);
