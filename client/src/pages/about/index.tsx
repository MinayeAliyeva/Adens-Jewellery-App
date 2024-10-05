import { Col, Layout, Row, Typography } from "antd";
import { ButtonStyle, ColStyle, TypographyStyle } from "./style";
import ButtonComponent from "../../components/ButtonComponent";
const infoImg = "./assets/images/aboutbg.jpg";
const infoImg2 = "./assets/images/aboutbg2.jpg";

const About = () => {
  return (
    <>
      <Layout style={{ padding: "20px" }}>
        <Row justify="space-between" align="middle">
          <Col span={12} style={ColStyle}>
            <Typography style={{ fontSize: "55px", fontWeight: "200" }}>
              Enhancing Your Style
            </Typography>
            <Typography style={TypographyStyle}>
              Together with you, enhance your temperament – affirm your
              luxurious beauty with impressive designs…
            </Typography>
            <ButtonComponent buttonText={"Shop Now"} style={ButtonStyle} />
          </Col>
          <Col span={12}>
            <img
              src={infoImg}
              alt="Jewelry"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
        </Row>
      </Layout>
      <Layout style={{ padding: "20px" }}>
        <Row justify="space-between" align="middle">
          <Col span={12}>
            <img
              src={infoImg2}
              alt="Jewelry"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
          <Col span={12} style={ColStyle}>
            <Typography style={{ fontSize: "55px", fontWeight: "200" }}>
              Ensemble with Earrings
            </Typography>
            <Typography style={TypographyStyle}>
              Genuine gold and silver jewelry for young people, elegant design,
              diverse designs help you perfect and transform your daily style
            </Typography>
            <ButtonComponent buttonText={"Shop Now"} style={ButtonStyle} />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default About;
