import { FC, memo } from "react";
import { Button, Modal, Input, Form, Row, Col, message } from "antd";
import { useCreateOrderMutation } from "../../redux/api/order/order-api";
import { IBasketResponse } from "../../redux/api/basket/modules";
import { getUserFromToken } from "../helpers/authStorage";
const payImages = "./assets/images/pay.png";

interface IOrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  onClose: () => void;
  basketData: IBasketResponse;
  shippingFee: number;
}

const OrderModal: FC<IOrderModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  basketData,
  shippingFee,
  onClose,
}) => {
  const [sendOrder] = useCreateOrderMutation();
  const userData = getUserFromToken();
  const [form] = Form.useForm();

  const handleModalClose = () => {
    form.resetFields();
    setIsModalOpen(false);
    onClose();
  };

  const onFinish = (values: any) => {
    sendOrder({
      productItems: basketData?.products?.map((product) => ({
        productId: product?.productId?._id,
        quantity: product?.quantity,
      })),
      shippingAddress: values?.address ?? "",
      userId: userData?._id as string,
      payment: {
        cardNumber: values?.cardNumber,
        cvv: values?.cvv,
        expiryDate: values?.expiryDate,
      },
      shippingFee,
    }).then((res: any) => {
      message.success("Order sent!");
      handleModalClose();
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Modal
        title="Order Information"
        open={isModalOpen}
        onCancel={handleModalClose}
        width={900}
        footer={null}
      >
        <Form
          name="create-order"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <img src={payImages} alt="Payment Methods" />

          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { required: true, message: "Please enter your card number!" },
              { min: 16, message: "Card number must be at least 16 digits!" },
              { max: 19, message: "Card number must be at most 19 digits!" },
              {
                pattern: /^\d+$/,
                message: "Card number must contain only digits!",
              },
            ]}
          >
            <Input placeholder="1234 5678 9123 4567" maxLength={19} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[
                  { required: true, message: "Enter expiry date!" },
                  {
                    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Format must be MM/YY",
                  },
                ]}
              >
                <Input placeholder="MM/YY" maxLength={5} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[
                  { required: true, message: "Enter CVV!" },
                  { min: 3, message: "CVV must be 3 digits!" },
                  { max: 3, message: "CVV must be 3 digits!" },
                  {
                    pattern: /^\d{3}$/,
                    message: "CVV must contain only digits!",
                  },
                ]}
              >
                <Input placeholder="123" maxLength={3} />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end" gutter={8}>
            <Col>
              <Button
                onClick={handleModalClose}
                style={{ borderColor: "rgb(64, 51, 29)" }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "rgb(64, 51, 29)", color: "#fff" }}
              >
                Confirm Order
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(OrderModal);
