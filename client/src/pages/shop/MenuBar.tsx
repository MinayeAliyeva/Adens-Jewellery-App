import { Divider } from "antd";
import SelecBox from "./SelecBox";
import { PriceFilter } from "./PriceFilter";

const MenuBar: React.FC = () => {

  return (
    <div
      style={{
        width: '456px',
        height: "100vh",
        padding: "20px",
        backgroundColor: "#fff",
        overflowY: "auto",
        borderRight: "1px solid",
      }}
    >
      <PriceFilter />
      <Divider />
      <SelecBox />
    </div>
  );
};

export default MenuBar;
