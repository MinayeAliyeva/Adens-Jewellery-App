import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import { CSSProperties } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/es/date-picker"; 

export interface IDatePickerControlled extends DatePickerProps {
  style?: CSSProperties;
  onChange?: (date: dayjs.Dayjs | null, dateString: string | string[]) => void;
  control: any;
  name?: string;
  rules?: Record<string, any>;
  placeholder?: string;
}

const disabledDate: DatePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().startOf("day");
};

export const DatePickerControlled = ({
  style,
  onChange,
  placeholder = "Enter Response",
  control,
  name = "datePicker",
  ...rest
}: IDatePickerControlled) => {
  return (
    <div className="input-container">
      <Controller
        name={name}
        control={control}
        rules={rest.rules}
        render={({ field, fieldState }) => (
          <DatePicker
            {...field}
            {...rest} 
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
            style={style}
            placeholder={placeholder}
            onChange={(date, dateString) => {
              if (onChange) onChange(date, dateString);
              field.onChange(date);
            }}
          />
        )}
      />
    </div>
  );
};
