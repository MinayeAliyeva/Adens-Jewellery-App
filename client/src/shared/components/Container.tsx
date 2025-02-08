import { Layout, LayoutProps } from "antd";
import React, { CSSProperties, FC, memo } from "react";

const { Content } = Layout;

interface IContainerProps extends LayoutProps {
  width?: string;
  children: React.ReactNode;
  backgroundColor?: CSSProperties["backgroundColor"];
  zIndex?: CSSProperties["zIndex"];
  color?: CSSProperties["color"];
  marginTop?: CSSProperties["marginTop"];
  marginBottom?: CSSProperties["marginTop"];
  height?: CSSProperties["height"];
}
const Container: FC<IContainerProps> = ({
  width = "100%",
  height,
  children,
  backgroundColor = "#fff",
  color = "#000",
  className,
  marginTop,
  marginBottom,
  zIndex,
}) => {
  return (
    <div
      style={{
        maxWidth: width,
        minHeight: height,
        backgroundColor,
        color,
        marginTop,
        marginBottom,
        zIndex,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default memo(Container);
