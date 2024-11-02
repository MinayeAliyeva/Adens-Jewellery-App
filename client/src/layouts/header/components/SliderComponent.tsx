import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Slider } from "antd";
import Typography from "antd/es/typography/Typography";
import { LuCar } from "react-icons/lu";

interface ISliderComponentProps {
  totalPrice: number;
  setShippingFee?: Dispatch<SetStateAction<number>>;
}

const taxRate = 6;
const freeShippingThreshold = 2500;

const SliderComponent: FC<ISliderComponentProps> = ({ totalPrice, setShippingFee }) => {
  const taxAmount = (totalPrice * taxRate) / 100;
  const remainingAmount = totalPrice >= freeShippingThreshold ? 0 : taxAmount;

  useEffect(() => {
    if(remainingAmount === 0) return;
    setShippingFee?.(remainingAmount);
  }, [remainingAmount]);

  return (
    <>
      <Typography style={{ fontSize: "25px" }}>
        {totalPrice >= freeShippingThreshold
          ? "Congratulations! You have free shipping!"
          : `Spend $${remainingAmount.toFixed(2)} more to get free shipping!`}
      </Typography>
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Slider
          value={totalPrice}
          max={freeShippingThreshold}
          disabled={totalPrice >= freeShippingThreshold}
          min={0}
          style={{ width: "100%" }}
        />
        {totalPrice < freeShippingThreshold && (
          <div
            style={{
              position: "absolute",
              top: "-25px",
              right: `${(1 - totalPrice / freeShippingThreshold) * 100}%`,
              transform: "translateX(50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LuCar
              style={{ color: "#1890ff", marginRight: "5px", fontSize: "40px" }}
            />
            <span>${remainingAmount.toFixed(2)}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SliderComponent;
