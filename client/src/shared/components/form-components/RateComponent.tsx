import { Controller } from "react-hook-form";
import { Rate } from "antd";
export interface CustomInputProps {
  label?: string;
  control: any;
  name?: string;
  rules?: Record<string, any>;
  placeholder?: string;
  type?: string;
}

export const RateComponent = ({
  type = "text",
  placeholder = "Enter Response",
  control,
  name = "rate",
  ...rest
}: CustomInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rest.rules}
      render={({ field }) => (
        <Rate style={{ marginTop: "10px" }} {...field} />
      )}
    />
  );
};
