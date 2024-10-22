import { Avatar, Badge, Space } from "antd";
import { SpaceSize } from "antd/es/space";
import { FC, ReactElement, ReactNode } from "react";

interface IBadgeComponentProps {
    count?: number | null;
    size?: SpaceSize;
    shape?: "circle" | "square";
    children?: ReactNode | ReactElement
}

const BadgeComponent: FC<IBadgeComponentProps> = ({count, size="middle", shape, children}) => {
  return (
    <Space size={size}>
      <Badge count={count}>
        {children}
      </Badge>
    </Space>
  );
};

export default BadgeComponent;