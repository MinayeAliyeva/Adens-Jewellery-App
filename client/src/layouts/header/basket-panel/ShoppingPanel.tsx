import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Drawer,
  List,
  Button,
  Typography,
  Avatar,
  Divider,
  Modal,
  Space,
  Popconfirm,
} from "antd";
import { FC, memo, useEffect, useState } from "react";
import { IoIosSend, IoMdEye } from "react-icons/io";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import { useLazyGetBasketByUserIdQuery } from "../../../redux/api/basket/basket-api";

interface IProduct {
  _id: string;
  productName: string;
  price: number;
  color: string;
  description: string;
  mainImageUrl: string;
  quantity: number;
}

interface IDrawerComponentProps {
  onClose: () => void;
  isDrawerVisible: boolean;
}

const userData = getUserFromToken();
const ShoppingPanel: FC<IDrawerComponentProps> = ({
  onClose,
  isDrawerVisible,
}) => {
  const [getBasket, { data: basketData, isLoading: isLoadingBasket }] =
    useLazyGetBasketByUserIdQuery<any>();
  
  useEffect(() => {
    getBasket({ id: userData?._id ?? "" });
  }, [userData?._id]);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = basketData?.products.map((product: any) => product);

  // const totalPrice = data?.reduce((acc, product) => acc + product.productId.price * product.quantity, 0) || 0;

  return (
    <>
      <Drawer
        title={<Typography.Title level={3}>🛒 Alışveriş Sepeti</Typography.Title>}
        placement="right"
        onClose={onClose}
        visible={isDrawerVisible}
        width={650}
        bodyStyle={{ paddingBottom: 80, paddingTop: 20 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Typography.Title level={4}>
              {/* Toplam: <span style={{ color: "#1890ff" }}>${totalPrice.toFixed(2)}</span> */}
            </Typography.Title>
            <Button
              type="primary"
              size="large"
              icon={<IoIosSend />}
              block
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                borderRadius: "5px",
              }}
            >
              Siparişi Ver
            </Button>
          </div>
        }
      >
        <List
          dataSource={data}
          renderItem={(product: any) => (
            <List.Item key={product?._id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={product?.productId.mainImageUrl}
                    shape="square"
                    size={64}
                  />
                }
                title={
                  <Typography.Text strong>
                    {product.productId.productName}
                  </Typography.Text>
                }
                description={
                  <>
                    <Typography.Text>
                      Fiyat: ${product.productId.price}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      Renk: {product.productId.color}
                    </Typography.Text>
                  </>
                }
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  type="default"
                  shape="circle"
                  // onClick={() => decreaseQuantity(product._id)}
                  style={{ margin: "0 5px" }}
                >
                  -
                </Button>
                <span style={{ margin: "0 12px", fontSize: "16px" }}>
                  {product?.quantity}
                </span>
                <Button
                  type="default"
                  shape="circle"
                  // onClick={() => increaseQuantity(product._id)}
                  style={{ margin: "0 5px" }}
                >
                  +
                </Button>
                <Space style={{ marginLeft: 12 }}>
                  <Button
                    shape="circle"
                    icon={<IoMdEye />}
                    // onClick={() => showModal(product)}
                    style={{ margin: "0 5px" }}
                  />
                  <Popconfirm
                    title="Ürünü sil"
                    description="Bu ürünü silmek istediğinize emin misiniz?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button shape="circle" icon={<DeleteOutlined />} danger />
                  </Popconfirm>
                </Space>
              </div>
            </List.Item>
          )}
        />
      </Drawer>

      <Modal
        title={
          <Typography.Title level={3}>
            {selectedProduct?.productName}
          </Typography.Title>
        }
        visible={isModalVisible}
        footer={null}
        bodyStyle={{ padding: "20px", textAlign: "center" }}
      >
        {selectedProduct && (
          <>
            <Avatar
              src={selectedProduct.mainImageUrl}
              size={150}
              shape="square"
              style={{
                marginBottom: "20px",
                borderRadius: "10px",
                border: "2px solid #1890ff",
              }}
            />
            <Typography.Paragraph>
              <Typography.Text strong>Açıklama:</Typography.Text>{" "}
              {selectedProduct.description}
            </Typography.Paragraph>
            <Divider />
            <Space size="middle" direction="vertical">
              <Typography.Text strong>
                Renk: {selectedProduct.color}
              </Typography.Text>
              <Typography.Text strong>
                Fiyat: ${selectedProduct.price}
              </Typography.Text>
            </Space>
            <Button
              type="primary"
              style={{
                marginTop: "20px",
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                borderRadius: "5px",
              }}
              // onClick={handleModalClose}
            >
              Kapat
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default memo(ShoppingPanel);
