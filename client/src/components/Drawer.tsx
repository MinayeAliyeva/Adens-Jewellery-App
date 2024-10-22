import type { DrawerProps } from "antd";
import { Checkbox, Divider, Drawer, Space, Typography } from "antd";
import { FC, memo, useState } from "react";

export interface ICheckboxComponentProps {checked: boolean, option: string, sort: 'asc' | 'desc'}
interface IDrawerComponentProps {
  open: boolean;
  placement?: DrawerProps["placement"];
  setOpen: (arg: boolean) => void;
  onCloseTakeDrawerValues: (value: ICheckboxComponentProps) => void
}

const initialValue = {
  sortPriceDesc: false,
  sortPriceAsc: false,
  sortRaitingDesc: false,
  sortRaitingAsc: false,
  sorCreatetDateAsc: false,
  sorCreatetDateDesc: false,
};
const RangeDrawerComponent: FC<IDrawerComponentProps> = ({
  open,
  setOpen,
  placement = "bottom",
  onCloseTakeDrawerValues
}) => {
  const [checkedValues, setCheckedValues] = useState(initialValue);
  const onClose = (value: any) => {
    onCloseTakeDrawerValues(value);
    setOpen(false);
  };

  const handleCheckboxChange = ({checked, option, sort}: ICheckboxComponentProps) => {
    setCheckedValues({
      ...initialValue,
      [option]: checked
    })
    onClose({checked, option, sort});
  };

  return (
    <Drawer
      title="Sıralama Seçenekleri"
      placement={placement}
      closable={true}
      onClose={onClose}
      open={open}
      width={400}
      height={650}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* <Divider orientation="left">Sıralama Seçenekleri</Divider> */}

        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Title level={5}>Price</Typography.Title>
          <Checkbox
            name="sortPrice"
            value="desc"
            checked={checkedValues.sortPriceDesc}
            onChange={(e) => handleCheckboxChange({checked: e.target.checked, option:'sortPriceDesc', sort:'desc'})}
          >
            Yüksekten Aşağıya
          </Checkbox>
          <Checkbox
            name="sortPrice"
            value="asc"
            checked={checkedValues.sortPriceAsc}
            onChange={(e) => handleCheckboxChange({checked: e.target.checked, option:'sortPriceAsc', sort:'asc'})}
          >
            Düşükten Yükseğe
          </Checkbox>
        </Space>

        <Divider orientation="left">Derecelendirme</Divider>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Title level={5}>Raiting</Typography.Title>
          <Checkbox
            name="sortPrice"
            value="desc"
            checked={checkedValues.sortRaitingDesc}
            onChange={(e) => handleCheckboxChange({checked: e.target.checked, option:'sortRaitingDesc', sort:'desc'})}
          >
            Yüksekten Aşağıya
          </Checkbox>
          <Checkbox
            name="sortPrice"
            value="asc"
            checked={checkedValues.sortRaitingAsc}
            onChange={(e) => handleCheckboxChange({checked: e.target.checked, option:'sortRaitingAsc', sort:'asc'})}
          >
            Düşükten Yükseğe
          </Checkbox>
        </Space>


        <Divider orientation="left">Tarih</Divider>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Title level={5}>Yaranma Tarxi</Typography.Title>
          <Checkbox
            name="sortPrice"
            value="desc"
            checked={checkedValues.sortRaitingDesc}
            onChange={(e) => handleCheckboxChange({checked: e.target.checked, option:'sortCreateDateDesc', sort:'desc'})}
          >
            Yüksekten Aşağıya
          </Checkbox>
          <Checkbox
            name="sortPrice"
            value="asc"
            checked={checkedValues.sortRaitingAsc}
            onChange={(e) => handleCheckboxChange({checked: e.target.checked, option:'sorCreatetDateAsc', sort:'asc'})}
          >
            Düşükten Yükseğe
          </Checkbox>
        </Space>
      </Space>
    </Drawer>
  );
};

export default memo(RangeDrawerComponent);
