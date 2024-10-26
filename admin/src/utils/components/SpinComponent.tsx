import { FC, ReactNode, ReactElement } from 'react';
import { Flex, Spin } from "antd";

interface IProps {
    size?: "small" | "default" | "large";
    gap?: string;
    tip?: ReactNode;
    children?: ReactNode | ReactElement;
    loading?: boolean;
};

export const SpinComponent: FC<IProps> = ({ size = 'default', gap='middle', tip='Loading...', children , loading}) => {
  return (
    <Flex gap={gap}  vertical>
      <Spin tip={tip} size={size} spinning={loading}>{children}</Spin>
    </Flex>
  );
};