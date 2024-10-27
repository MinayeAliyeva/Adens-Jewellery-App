import {
  ArrowRightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Divider, Modal, Typography } from "antd";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

interface IModalProps {
  setIsModalOpen: (arg: boolean) => void;
  isModalOpen: boolean;
}

const ModalComponent: FC<IModalProps> = ({ setIsModalOpen, isModalOpen }) => {
  const navigate = useNavigate();

  const onModalCancel = () => {
    setIsModalOpen(false);
  };

  const onLogin = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const onRegister = () => {
    setIsModalOpen(false);
    navigate("/register");
  };

  return (
    <Modal
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ExclamationCircleOutlined
            style={{
              color: "#faad14",
              fontSize: "24px",
              marginRight: "10px",
            }}
          />
          <Typography.Title level={4} style={{ margin: 0 }}>
            You need to log in first
          </Typography.Title>
        </div>
      }
      open={isModalOpen}
      onCancel={onModalCancel}
      footer={null}
      centered
      width={600}
      bodyStyle={{ padding: "20px", textAlign: "center" }}
    >
      <Typography.Text style={{ fontSize: "16px", color: "#595959" }}>
        Please log in if you have an account or create a new one to continue.
      </Typography.Text>
      <Divider />
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <Button
          onClick={onLogin}
          style={{
            border: "1px solid",
            borderRadius: "8px",
            padding: "0 24px",
            fontSize: "16px",
            backgroundColor: "#3E160F",
            color: "#fff",
          }}
          icon={<ArrowRightOutlined />}
        >
          Go to Login
        </Button>
        <Button
          onClick={onRegister}
          style={{
            border: "1px solid",
            borderRadius: "8px",
            padding: "0 24px",
            fontSize: "16px",
            backgroundColor: "#1890ff",
            color: "#fff",
          }}
          icon={<ArrowRightOutlined />}
        >
          Go to Register
        </Button>
      </div>
    </Modal>
  );
};

export default memo(ModalComponent);
