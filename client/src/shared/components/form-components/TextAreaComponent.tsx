import { Controller } from "react-hook-form";
import { Input, Typography } from "antd";

export interface CustomInputProps {
  label?: string;
  control: any;
  name?: string;
  rules?: Record<string, any>;
  placeholder?: string;
  type?: string;
}

export const TextAreaComponent = ({
  type = "text",
  placeholder = "Enter Response",
  control,
  name = "area",
  ...rest
}: CustomInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rest?.rules}
        render={({ field, fieldState }) => (
          <Input.TextArea
            {...field}
            placeholder={placeholder}
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
          />
        )}
      />
    </>
  );
};
