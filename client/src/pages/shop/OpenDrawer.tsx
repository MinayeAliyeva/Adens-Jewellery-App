import { FC, useState } from "react";
import RangeDrawerComponent, { ICheckboxComponentProps } from "../../components/Drawer";
import { TbArrowsDownUp } from "react-icons/tb";

interface IOpenDrawerProps {
    onCloseTakeDrawerValues: (value: ICheckboxComponentProps) => void
};
const OpenDrawer:FC<IOpenDrawerProps> = ({onCloseTakeDrawerValues}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <TbArrowsDownUp
        style={{ fontSize: "30px" }}
        onClick={() => setDrawerOpen(true)}
      />
      <RangeDrawerComponent
        placement="bottom"
        open={drawerOpen}
        setOpen={setDrawerOpen}
        onCloseTakeDrawerValues={onCloseTakeDrawerValues}
      />
    </>
  );
};

export default OpenDrawer;