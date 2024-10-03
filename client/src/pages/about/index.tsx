import { Button, Col, Layout, Row, Typography } from "antd";
const infoImg = "./assets/images/aboutbg.jpg";
const infoImg2 = "./assets/images/aboutbg2.jpg";

const About = () => {
  return (
    <>
      {" "}
      <Layout style={{ padding: "20px" }}>
        <Row justify="space-between" align="middle">
          <Col
            span={12}
            style={{
              paddingRight: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              fontWeight: "bold",
              gap: "20px",
            }}
          >
            <Typography style={{ fontSize: "55px", fontWeight: "200" }}>
              Enhancing Your Style
            </Typography>
            <Typography
              style={{
                fontSize: "25px",
                fontWeight: "100",
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
              }}
            >
              Together with you, enhance your temperament – affirm your
              luxurious beauty with impressive designs…
            </Typography>
            <Button
              style={{
                borderRadius: "0",
                border: "1px solid #000",
                color: "#000",
                backgroundColor: "transparent",
                padding: "30px",
              }}
            >
              Shop Now
            </Button>
          </Col>
          <Col span={12}>
            <img
              src={infoImg}
              alt="Jewelry"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
        </Row>
      </Layout>{" "}
      <Layout style={{ padding: "20px" }}>
        <Row justify="space-between" align="middle">
          <Col span={12}>
            <img
              src={infoImg2}
              alt="Jewelry"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
          <Col
            span={12}
            style={{
              paddingRight: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              fontWeight: "bold",
              gap: "20px",
            }}
          >
            <Typography style={{ fontSize: "55px", fontWeight: "200" }}>
            Ensemble with Earrings
            </Typography>
            <Typography
              style={{
                fontSize: "25px",
                fontWeight: "100",
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
              }}
            >
              Genuine gold and silver jewelry for young people, elegant design, diverse
              designs help you perfect and transform your daily style
            </Typography>
            <Button
              style={{
                borderRadius: "0",
                border: "1px solid #000",
                color: "#000",
                backgroundColor: "transparent",
                padding: "30px",
              }}
            >
              Shop Now
            </Button>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default About;
