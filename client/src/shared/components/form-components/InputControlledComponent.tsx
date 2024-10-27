import { FC } from "react";
import { Controller, FieldErrors, FieldValues, Control } from "react-hook-form";
import { Divider, Input, InputProps } from "antd";
import { Content } from "antd/es/layout/layout";

interface IInputProps<T extends FieldValues> extends Omit<InputProps, "name"> {
  errorMessage?: string;
  labelText?: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  name: keyof T;
}

const InputControlledComponent: FC<IInputProps<FieldValues>> = ({
  name,
  placeholder,
  required,
  errorMessage,
  labelText,
  control,
  size,
  defaultValue,
  style,
  suffix,
  prefix,
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
          <Input
            style={style}
            suffix={suffix}
            prefix={prefix}
            placeholder={placeholder}
            {...field}
            size={size}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
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

export default InputControlledComponent;
