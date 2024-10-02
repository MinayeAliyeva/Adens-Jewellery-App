import { DatePicker } from "antd";
import type { GetProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CSSProperties, FC } from "react";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().startOf("day");
};
//!IDatePickerComponent extends ile yaz
interface IDatePickerComponent {
  style?: CSSProperties;
  onChange?: (date: dayjs.Dayjs | null, dateString: string | string[]) => void;
};

const DatePickerComponent: FC<IDatePickerComponent> = ({
  style,
  onChange,
}) => (
  <DatePicker 
    format="YYYY-MM-DD" 
    disabledDate={disabledDate} 
    style={style} 
    onChange={onChange} 
  />
);

export default DatePickerComponent;
