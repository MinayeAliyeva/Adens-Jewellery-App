import { Button, Col, Layout, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const infoImg = "./assets/images/info.jpg";

const Info = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/shop");
  };

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
            {t(
              "Jewelry is favored by both men and women because it shows luxury & class own aesthetic taste, affirming position…"
            )}
          </Typography>
          <Button
            onClick={handleShopNowClick}
            className="border border-black text-black bg-transparent rounded-none py-4 px-8"
          >
            {t("Shop Now")}
          </Button>
        </Col>
        <Col span={12}>
          <div className="overflow-hidden perspective" style={{ position: 'relative' }}>
            <img
              src={infoImg}
              alt="Jewelry"
              className="w-full h-auto object-cover transition-transform duration-500 ease-in-out transform hover:scale-110 hover:z-10"
              style={{ 
                transformStyle: 'preserve-3d', 
                position: 'relative', 
                backfaceVisibility: 'hidden' 
              }}
            />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Info;
