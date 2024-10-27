import { CSSProperties, FC, memo, ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectProps } from "antd";

const { Option } = Select;

interface ISelectBoxProps extends SelectProps {
  errorMessage?: ReactElement;
  labelText?: string;
  name?: string;
  required?: boolean;
  style?: CSSProperties;
}

const SelectBoxComponent: FC<ISelectBoxProps> = ({
  name = "name",
  placeholder,
  errorMessage,
  labelText,
  defaultValue,
  required,
  options,
  style,
  mode,
  size = "large", 
  ...rest 
}) => {
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <>
      {labelText && <label>{labelText}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            size={size} 
            mode={mode} 
            defaultValue={defaultValue}
            style={style}
            placeholder={placeholder}
            {...rest} 
          >
            {options?.map((item, index: number) => {
              return (
                <Option value={item.value} key={index}>
                  {item.label || item?.name}
                </Option>
              );
            })}
          </Select>
        )}
      />
      {required && errors[name] && errorMessage}
    </>
  );
};

export default memo(SelectBoxComponent);
