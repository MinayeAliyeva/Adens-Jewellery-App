import { CSSProperties, FC } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { Select, SelectProps } from "antd";
import { Content } from "antd/es/layout/layout";

const { Option } = Select;

interface ISelectBoxProps<T extends FieldValues> extends SelectProps {
  labelText?: string;
  name: keyof T;
  control?: Control<T>;
  required?: boolean;
  style?: CSSProperties;
  errors?: FieldErrors<T>;
  errorMessage?: FieldError;
}

const SelectBoxComponent: FC<ISelectBoxProps<FieldValues>> = ({
  name = "name",
  placeholder,
  required,
  errorMessage,
  labelText,
  defaultValue,
  options,
  style,
  mode,
  control,
  size = "large",
  ...rest
}) => {
    
  return (
    <>
      {labelText && <label>{labelText}</label>}
      <Controller
        name={name}
        control={control}
      
        rules={{ required }}
        render={({ field }) => (
          <Select
            size={size}
            mode={mode}
            defaultValue={defaultValue}
            style={style}
            placeholder={placeholder}
            {...field}
            {...rest}
          >
            {options?.map((item, index: number) => {
              return (
                <Option value={item.value} key={index}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        )}
      />
      {errorMessage ? (
        <Content style={{ color: "red" }}>{errorMessage.message}</Content>
      ) : (
        ""
      )}
    </>
  );
};

export default SelectBoxComponent;
