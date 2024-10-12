import { FC } from "react";
import {
  Controller,
  FieldError,
  FieldErrors,
  FieldValues,
  Control,
} from "react-hook-form";
import { Input, InputProps } from "antd";
import { Content } from "antd/es/layout/layout";

// IInputProps uses a generic T that extends FieldValues
interface IInputProps<T extends FieldValues> extends Omit<InputProps, "name"> {
  errorMessage?: string;
  labelText?: string;
  control: Control<T>; // control should be typed based on generic T
  errors?: FieldErrors<T>;
  name: keyof T; // name should be a key of the generic type
}

const InputComponent: FC<IInputProps<FieldValues>> = ({
  name,
  placeholder,
  required,
  errorMessage,
  labelText,
  control,
  size,
  defaultValue,
}) => {
  return (
    <>
      {labelText && <label>{labelText}</label>}
      <Controller
        name={name as string} // Explicit cast to string
        control={control}
        defaultValue={defaultValue}
        rules={{ required }}
        render={({ field }) => (
          <Input placeholder={placeholder} {...field} size={size} />
        )}
      />
      {errorMessage ? (
        <Content style={{ color: "red" }}>{errorMessage}</Content>
      ) : (
        ""
      )}
    </>
  );
};

export default InputComponent;
