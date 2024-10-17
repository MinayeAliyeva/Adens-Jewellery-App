import { Button, Layout, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ErrorContentStyle } from "./style";

const { Content } = Layout;

const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={ErrorContentStyle}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={goHome}>
              Back Home
            </Button>
          }
        />
      </Content>
    </Layout>
  );
};

export default ErrorPage;
