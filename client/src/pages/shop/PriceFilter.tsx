import { Col, InputNumber, Row } from "antd";
import Title from "antd/es/typography/Title";
import { FC } from "react";

export const PriceFilter: FC = () => (
  <div style={{ padding: "10px" }}>
    <Title level={5}>Filter by Price</Title>
    <Row gutter={8}>
      <Col span={12}>
        <InputNumber
          min={0} 
          size="large"
          placeholder="Min"
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={12}>
        <InputNumber
          min={0} 
          size="large"
          placeholder="Max"
          style={{ width: "100%" }}
        />
      </Col>
    </Row>
  </div>
);
