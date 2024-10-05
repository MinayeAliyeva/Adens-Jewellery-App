import  { FC, ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, InputProps } from 'antd';

interface IInputProps extends InputProps{
    errorMessage?: ReactElement;
    labelText?: string;
};

const InputComponent: FC<IInputProps> = ({name="name", placeholder, required, errorMessage, labelText}) => {
  const { control, formState: { errors } } = useForm();

  
  return (
    <>
      {labelText && <label>{labelText}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required }}
        render={({field}) =>  <Input placeholder={placeholder} {...field}/>}
      />
      {required && errors[name] && errorMessage}
    </>
  );
};

export default InputComponent;
