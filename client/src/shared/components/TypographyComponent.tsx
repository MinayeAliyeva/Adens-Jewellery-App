import { Typography } from "antd";
import { CSSProperties, FC } from "react";
interface ITypographyComponentProps {
  level: 1 | 2 | 3 | 5 | 4 | undefined;
  style: CSSProperties;
  content: string;
}
const TypographyComponent: FC<ITypographyComponentProps> = ({
  level,
  style,
  content,
}) => {
  return (
    <Typography.Title level={level} style={style} content={content}>
      {content}
    </Typography.Title>
  );
};

export default TypographyComponent;
