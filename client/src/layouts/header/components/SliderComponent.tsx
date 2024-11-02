// import { FC } from "react";
// import { Slider } from "antd";
// import Typography from "antd/es/typography/Typography";
// interface ISliderComponentProps {
//   totalPrice: number;
// }
// const SliderComponent: FC<ISliderComponentProps> = ({ totalPrice }) => (
//   <>
//     {" "}
//     <Typography style={{ fontSize: "25px" }}>
//       {totalPrice > 500
//         ? "Congratulations! You have free shipping!"
//         : `Spend ${500 - totalPrice}more and get free shipping!`}
//     </Typography>
//     <Slider defaultValue={500 - totalPrice} tooltip={{ open: true }} />
//   </>
// );

// export default SliderComponent;
import { FC } from "react";
import { Slider } from "antd";
import Typography from "antd/es/typography/Typography";
import { LuCar } from "react-icons/lu";

interface ISliderComponentProps {
  totalPrice: number;
}

const SliderComponent: FC<ISliderComponentProps> = ({ totalPrice }) => {
  const remainingAmount = 500 - totalPrice;

  return (
    <>
      <Typography style={{ fontSize: "25px" }}>
        {totalPrice >= 500
          ? "Congratulations! You have free shipping!"
          : `Spend ${remainingAmount} more and get free shipping!`}
      </Typography>
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Slider
          defaultValue={remainingAmount > 0 ? remainingAmount : 0}
          disabled={totalPrice >= 500}
          min={0}
        />
        {remainingAmount > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-25px",
              right: `${(remainingAmount / 500) * 100}%`,
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LuCar
              style={{ color: "#1890ff", marginRight: "5px", fontSize: "40px" }}
            />
            <span>{remainingAmount}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SliderComponent;
