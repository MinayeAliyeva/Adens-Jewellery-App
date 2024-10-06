import { FC, ReactNode } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { Input, InputProps } from "antd";
import { Content } from "antd/es/layout/layout";

/*

 <InputComponent 
    control={control}  
    errorMessage={errors.userName?.message} 
    {...register("userName")}
/>
*/


interface IInputProps extends InputProps {
  errorMessage?: ReactNode;
  labelText?: string;
  control?: any;
//   control?: Control<{[key: string]: string}, any>;
  errors?: FieldErrors<FieldValues>;
}

const InputComponent: FC<IInputProps> = ({
  name = "name",
  placeholder,
  required,
  errorMessage,
  labelText,
  control,
  errors,
  size
}) => {
    console.log(errorMessage);
    
  return (
    <>
      {labelText && <label>{labelText}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required }}
        render={({ field }) => <Input placeholder={placeholder} {...field} size={size}/>}
      />
      {errorMessage ? <Content style={{color: "red"}}>{errorMessage}</Content> : ""}
    </>
  );
};

export default InputComponent;
