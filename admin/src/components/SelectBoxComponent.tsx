import { CSSProperties, FC, ReactElement } from "react";
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
  control: Control<T>;
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
    console.log({defaultValue});
    
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

// import React from 'react';
// import { Select } from 'antd';
// import type { SelectProps } from 'antd';

// const options: SelectProps['options'] = [];

// for (let i = 10; i < 36; i++) {
//   options.push({
//     value: i.toString(36) + i,
//     label: i.toString(36) + i,
//   });
// }

// const handleChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

// const SelectBoxComponent: React.FC = () => (
//   <Select
//     mode="tags"
//     style={{ width: '100%' }}
//     placeholder="Tags Mode"
//     onChange={handleChange}
//     options={options}
//   />
// );

// export default SelectBoxComponent;
