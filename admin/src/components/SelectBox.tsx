import { CSSProperties, FC } from "react";
import { Select, Space } from "antd";

interface ISelectBox {
  sizeOptions: { label: string; value: string }[];
  handleChange?: (value: string[]) => void;
  allowClear?: boolean;
  defaultValue?: string[];
  placeholder?: string;
  mode?: "multiple" | "tags";
  style?: CSSProperties;
  name: string;
}
const SelectBox: FC<ISelectBox> = ({
  sizeOptions,
  mode,
  allowClear,
  defaultValue,
  placeholder,
  style,
  handleChange,
  name,
}) => (
  <Select
    mode={mode}
    style={style}
    defaultValue={defaultValue}
    placeholder={placeholder}
    onChange={handleChange}
    options={sizeOptions}
    allowClear={allowClear}
    optionRender={(option) => <Space key={option.value}>{option.label}</Space>}
  />
);

export default SelectBox;
