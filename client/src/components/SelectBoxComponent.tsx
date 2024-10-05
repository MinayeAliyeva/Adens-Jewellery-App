import { FC, ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectProps } from "antd";

const { Option } = Select;

interface ISelectBoxProps extends SelectProps {
  errorMessage?: ReactElement;
  labelText?: string;
  name?: string;
  required?: boolean;
}

const SelectBoxComponent: FC<ISelectBoxProps> = ({
  name = "name",
  placeholder,
  errorMessage,
  labelText,
  defaultValue,
  required,
  options
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
        defaultValue=""
        rules={{ required }}
        render={({ field }) => (
          <Select defaultValue={defaultValue} style={{ width: 120 }}>
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
      {required && errors[name] && errorMessage}
    </>
  );
};

export default SelectBoxComponent;
