import { Controller } from 'react-hook-form';
import { Input } from 'antd';

export interface CustomInputProps {
  label: string;
  control: any;
  name: string;
  rules: Record<string, any>;
  placeholder: string;
  type: string;
}

export const CustomInput = ({  label,
  type = 'text',
  placeholder = 'Enter Response',
  control,
  ...rest
}: CustomInputProps) => {
 
  return (
    <div className="input-container">
      <label>{label}</label>
          <Controller
            name={rest.name}
            control={control}
            rules={rest.rules}
            render={({ field, fieldState }) => (
              <Input
                bordered={false}
                {...field}
                placeholder={placeholder}
                className={
                  fieldState.invalid ? 'custom-input error' : 'custom-input'
                }
              />
            )}
          />
    </div>
  );
};



