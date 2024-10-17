import { Layout, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import { IFooterStyle } from "./style";
const { Footer } = Layout;

const FooterStyle: IFooterStyle = {
  color: "#000",
  textAlign: "center",
  padding: "40px 20px",
  height: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const CustomFooter = () => {
  console.log("FOOTER RERENDER");
  
  return (
    <Footer style={FooterStyle}>
      <Row justify="center" gutter={[16, 24]} style={{ width: "100%" }}>
        <Col
          span={6}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography style={{ color: "#000", marginBottom: "16px" }}>
            About
          </Typography>
          <Typography>
            <Link to="/about" style={{ color: "#000" }}>
              About Us
            </Link>
          </Typography>
          <Typography>
            <Link to="/company" style={{ color: "#000" }}>
              Company
            </Link>
          </Typography>
        </Col>
        <Col
          span={6}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography style={{ color: "#000", marginBottom: "16px" }}>
            Services
          </Typography>
          <Typography>
            <Link to="/services" style={{ color: "#000" }}>
              Consulting
            </Link>
          </Typography>
          <Typography>
            <Link to="/services" style={{ color: "#000" }}>
              Product Development
            </Link>
          </Typography>
        </Col>
        <Col
          span={6}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography style={{ color: "#000", marginBottom: "16px" }}>
            İletişim
          </Typography>
          <Typography>
            <Link to="/contact" style={{ color: "#000" }}>
              Contact us
            </Link>
          </Typography>
          <Typography>
            <Link to="/support" style={{ color: "#000" }}>
              Help
            </Link>
          </Typography>
        </Col>
        <Col
          span={6}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography style={{ color: "#000", marginBottom: "16px" }}>
            Sosial Media
          </Typography>
          <Typography>
            <Link to="https://facebook.com" style={{ color: "#000" }}>
              Facebook
            </Link>
          </Typography>
          <Typography>
            <Link to="https://instagram.com" style={{ color: "#000" }}>
              Instagram
            </Link>
          </Typography>
        </Col>
      </Row>
      <Typography style={{ marginTop: "40px", marginBottom: 0 }}>
        © {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Footer>
  );
};

export default CustomFooter;
