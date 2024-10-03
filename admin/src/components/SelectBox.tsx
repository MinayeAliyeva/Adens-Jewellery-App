import { FC } from "react";
import { Select, Space } from "antd";
import { SelectProps } from "antd/es/select";

interface ISelectBox extends SelectProps<string[]> {
  sizeOptions: { label: string; value: string }[];
  handleChange?: (value: string[]) => void;
  name: string;
}

const SelectBox: FC<ISelectBox> = ({
  sizeOptions,
  handleChange,
  name,
  ...rest
}) => (
  <Select
    {...rest}
    options={sizeOptions}
    onChange={handleChange}
    optionRender={(option) => <Space key={option.value}>{option.label}</Space>}
  />
);

export default SelectBox;
