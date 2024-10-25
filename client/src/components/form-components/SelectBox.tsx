import { FC, memo } from "react";
import { Select, Space } from "antd";
import { SelectProps } from "antd/es/select";

interface ISelectBox extends SelectProps<string[] | string> {
  options?: { label: string; value: string }[];
  handleChange?: (value: string[] | string) => void;
  name: string;
}

const SelectBox: FC<ISelectBox> = ({
  options=[{label: "", value: ""}],
  handleChange,
  defaultValue,
  name,
  ...rest
}) => (
  <Select
    {...rest}
    defaultValue={defaultValue}
    options={options}
    onChange={handleChange}
    optionRender={(option) => <Space key={option?.value}>{option?.label}</Space>}
  />
);

export default memo(SelectBox);
