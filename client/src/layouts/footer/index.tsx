import React from "react";
import { Layout, Row, Col } from "antd";

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer
      style={{
        color: "#000",
        textAlign: "center",
        padding: "40px 20px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Row justify="center" gutter={[16, 24]} style={{ width: "100%" }}>
        <Col span={6} style={{ display: "flex", flexDirection: "column" ,gap:'10px'}}>
          <h3 style={{ color: "#000", marginBottom: "16px" }}>About</h3>
          <p>
            <a href="/about" style={{ color: "#000" }}>
              About Us
            </a>
          </p>
          <p>
            <a href="/company" style={{ color: "#000" }}>
              Company
            </a>
          </p>
        </Col>
        <Col span={6} style={{ display: "flex", flexDirection: "column" ,gap:'10px'}}>
          <h3 style={{ color: "#000", marginBottom: "16px" }}>Services</h3>
          <p>
            <a href="/services" style={{ color: "#000" }}>
              Consulting
            </a>
          </p>
          <p>
            <a href="/services" style={{ color: "#000" }}>
              Product Development
            </a>
          </p>
        </Col>
        <Col span={6} style={{ display: "flex", flexDirection: "column" ,gap:'10px'}}>
          <h3 style={{ color: "#000", marginBottom: "16px" }}>İletişim</h3>
          <p>
            <a href="/contact" style={{ color: "#000" }}>
              Contact us
            </a>
          </p>
          <p>
            <a href="/support" style={{ color: "#000" }}>
              Help
            </a>
          </p>
        </Col>
        <Col span={6} style={{ display: "flex", flexDirection: "column" ,gap:'10px'}}>
          <h3 style={{ color: "#000", marginBottom: "16px" }}>Sosial Media</h3>
          <p>
            <a href="https://facebook.com" style={{ color: "#000" }}>
              Facebook
            </a>
          </p>
          <p>
            <a href="https://instagram.com" style={{ color: "#000" }}>
              Instagram
            </a>
          </p>
        </Col>
      </Row>
      <p style={{ marginTop: "40px", marginBottom: 0 }}>
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </Footer>
  );
};

export default CustomFooter;