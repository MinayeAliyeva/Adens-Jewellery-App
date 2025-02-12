import { FC } from "react";
import {
  Controller,
  FieldErrors,
  FieldValues,
  Control,
} from "react-hook-form";
import { Input, InputProps } from "antd";
import { Content } from "antd/es/layout/layout";

interface IInputProps<T extends FieldValues> extends Omit<InputProps, "name"> {
  errorMessage?: string;
  labelText?: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  name: keyof T;
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
        name={name as string}
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
