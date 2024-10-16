import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import { CSSProperties } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";

export interface IDatePickerControlled extends DatePickerProps {
  style?: CSSProperties;
  onChange?: (date: dayjs.Dayjs | null, dateString: string | string[]) => void;
  control: any;
  name?: string;
  rules?: Record<string, any>;
  placeholder?: string;
  customdefaultValue?: string;
}

dayjs.extend(customParseFormat);

const disabledDate: DatePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().startOf("day");
};

const dateFormat = "DD.MM.YYYY";

const customFormat: DatePickerProps["format"] = (value) =>
  value ? value.format(dateFormat) : '';

export const DatePickerControlled = ({
  style,
  onChange,
  placeholder = "Enter Response",
  control,
  name = "datePicker",
  customdefaultValue,
  ...rest
}: IDatePickerControlled) => {
  const parsedDefaultValue = customdefaultValue ? dayjs(customdefaultValue, dateFormat) : undefined;

  return (
    <div className="input-container">
      <Controller
        name={name}
        control={control}
        rules={rest.rules}
        render={({ field, fieldState }) => (
          <DatePicker
            name={name}
            disabledDate={disabledDate}
            style={style}
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
            defaultValue={parsedDefaultValue}
            format={customFormat}
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
