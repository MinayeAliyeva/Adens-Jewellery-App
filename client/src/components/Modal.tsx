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

  const onModalCancle = () => {
    setIsModalOpen(false);
  };
  const onLogin = () => {
    setIsModalOpen(false);
    navigate("/login");
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
            İlk önce giriş yapmanız gerekir
          </Typography.Title>
        </div>
      }
      open={isModalOpen}
      onCancel={onModalCancle}
      footer={null}
      centered
      width={600}
      bodyStyle={{ padding: "20px", textAlign: "center" }}
    >
      <Typography.Text style={{ fontSize: "16px", color: "#595959" }}>
        Devam etmek için lütfen giriş yapın.
      </Typography.Text>
      <Divider />
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
        Login sayfasına git
      </Button>
    </Modal>
  );
};

export default memo(ModalComponent);
