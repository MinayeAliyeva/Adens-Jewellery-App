import { Controller } from "react-hook-form";
import { Input } from "antd";

export interface CustomInputProps {
  label: string;
  control: any;
  name: string;
  rules: Record<string, any>;
  placeholder: string;
  type: string;
}

export const InputComponent = ({
  type = "text",
  placeholder = "Enter Response",
  control,
  name = "input",
  ...rest
}: CustomInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rest.rules}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          type={type}
          placeholder={placeholder}
          className={fieldState.invalid ? "custom-input error" : "custom-input"}
        />
      )}
    />
  );
};
