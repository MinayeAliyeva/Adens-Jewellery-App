import { Col, Layout, Row, Typography } from "antd";
const brand1 = "/assets/images/brand-2.png";
const brand2 = "/assets/images/brand-3.png";
const brand3 = "/assets/images/brand-4.png";
const brand4 = "/assets/images/brand-5.png";
const brand5 = "/assets/images/band.png";

const Brends = () => {
  return (
    <Layout
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        height: "600px",
        gap: "30px",
      }}
    >
      <Layout
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {" "}
        <Typography
          style={{
            marginBottom: "20px",
            fontSize: "40px",
            width: "60%",
            fontWeight: "100",
            textAlign: "center",
          }}
        >
          We only discovered this fabulous fine jeweler recently. The premises
          are beautiful, and the staff is extremely knowledgeable and friendly.
          It’s impossible to walk out empty-handed! It is a...
        </Typography>
        <Typography style={{ color: "gray", fontSize: "20px" }}>
          "Luca Moretti"-"Designer"
        </Typography>
      </Layout>
      <Row justify="space-between" gutter={[16, 16]}>
        <Col>
          <img src={brand1} alt="Brand 1" style={{ width: "200px" }} />
        </Col>
        <Col>
          <img src={brand2} alt="Brand 2" style={{ width: "200px" }} />
        </Col>
        <Col>
          <img src={brand3} alt="Brand 3" style={{ width: "200px" }} />
        </Col>
        <Col>
          <img src={brand4} alt="Brand 4" style={{ width: "200px" }} />
        </Col>
        <Col>
          <img src={brand5} alt="Brand 5" style={{ width: "200px" }} />
        </Col>
      </Row>
    </Layout>
  );
};

export default Brends;
