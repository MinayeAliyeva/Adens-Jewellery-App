import CheckboxComponent from "./form-components/CheckboxComponent";
import type { DrawerProps } from "antd";
import { Checkbox, Divider, Drawer, Space, Typography } from "antd";
import { FC } from "react";

interface IDrawerComponentProps {
  open: boolean;
  placement?: DrawerProps["placement"];
  setOpen: (arg: boolean) => void;
}

const RangeDrawerComponent: FC<IDrawerComponentProps> = ({
  open,
  setOpen,
  placement = "bottom",
}) => {
  const onClose = () => {
    setOpen(false);
  };
  const handleCheckboxChange = () => {
    onClose();
  };
  return (
    <Drawer
      title="Filtreleme Seçenekleri"
      placement={placement}
      closable={true}
      onClose={onClose}
      open={open}
      width={400}
      height={650}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Divider orientation="left">Sıralama Seçenekleri</Divider>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography>Price</Typography>
          <Checkbox onChange={handleCheckboxChange}>Yüksekten Aşağıya</Checkbox>
          //!bunla et onClose gondere bilerikmi
          <CheckboxComponent/>
          <Checkbox>Düşükten Yükseğe</Checkbox>
        </Space>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography>Raiting</Typography>
          <Checkbox>Yüksekten Aşağıya</Checkbox>
          <Checkbox>Düşükten Yükseğe</Checkbox>
        </Space>
        <Divider orientation="left">Ürün Durumu</Divider>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Checkbox>Daha Yeni Ürünler</Checkbox>
        </Space>

        <Divider orientation="left">Derecelendirme</Divider>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography>Raiting</Typography>
          <Checkbox>Yüksekten Aşağıya</Checkbox>
          <Checkbox>Düşükten Yükseğe</Checkbox>
        </Space>
      </Space>
    </Drawer>
  );
};

export default RangeDrawerComponent;
