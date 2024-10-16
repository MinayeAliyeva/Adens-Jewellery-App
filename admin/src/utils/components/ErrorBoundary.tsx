import { Button, Result } from "antd";
import { Content } from "antd/es/layout/layout";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    console.log("ERRRRRRORRR");

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Content style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <Result
            status="500"
            title="Oops! Bir hata oluştu."
            subTitle="Üzgünüz, sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yeniden yüklemeyi deneyin."
            extra={
              <Button type="primary" onClick={this.handleReload}>
                Sayfayı Yenile
              </Button>
            }
          />
        </Content>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
