import * as React from "react";
import { Row, Col } from "antd";

export const XContainer = ({
  minWidth = "100%",
  height = "100vh",
  style = {},
  children,
}: any) => {
  return (
    <Row justify="center" style={{ minWidth }}>
      <Col style={{ height, width: minWidth, ...style }}>
        {children}
      </Col>
    </Row>
  );
};
