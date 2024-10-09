import  { FC } from "react";
import { Checkbox} from "antd";
import type { GetProp } from "antd";

const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
  checkedValues
) => {
  console.log("checked = ", checkedValues);
};

interface ICheckboxProps {
  size: string;
}

const CheckBox: FC<ICheckboxProps> = ({ size }) => (
  <Checkbox.Group onChange={onChange}>
    <Checkbox value={size}>{size}</Checkbox>
  </Checkbox.Group>
);

export default CheckBox;
