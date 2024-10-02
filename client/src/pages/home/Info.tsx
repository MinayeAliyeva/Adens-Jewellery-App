import { Button, Col, Layout, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
const infoImg = "./assets/images/info.jpg";

const Info = () => {
  const { t } = useTranslation();
  return (
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
            {t("Chic Petal Perfection")}
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
            {t("Jewelry is favored by both men and women because it shows luxury & class own aesthetic taste, affirming position…")}
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
            {t("Shop Now")}
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
    </Layout>
  );
};

export default Info;
