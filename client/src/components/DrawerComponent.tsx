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
import { FC, memo, useState } from "react";
import { IoIosSend, IoMdEye } from "react-icons/io";
import ProductModal from "./ProductModal";

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

const productsData = [
  {
    _id: "6705bfc22d3ae83342f5f2c0",
    productName: "Acton Romero",
    price: 114,
    color: "Consectetur dolores",
    mainImageUrl: "http://localhost:8000/public/images/1728430018313_az.svg",
    description: "Et voluptates amet",
    quantity: 1,
  },
  {
    _id: "6705bfc22d3ae83342f5f2c0",
    productName: "Acton Romero",
    price: 114,
    color: "Consectetur dolores",
    mainImageUrl: "http://localhost:8000/public/images/1728430018313_az.svg",
    description: "Et voluptates amet",
    quantity: 1,
  },
];

const DrawerComponent: FC<IDrawerComponentProps> = ({
  onClose,
  isDrawerVisible,
}) => {
  const [products, setProducts] = useState<IProduct[]>(productsData);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const increaseQuantity = (id: string) => {
  //   setProducts((prev) =>
  //     prev.map((product) =>
  //       product._id === id
  //         ? { ...product, quantity: product.quantity + 1 }
  //         : product
  //     )
  //   );
  // };

  // const decreaseQuantity = (id: string) => {
  //   setProducts((prev) =>
  //     prev.map((product) =>
  //       product._id === id && product.quantity > 1
  //         ? { ...product, quantity: product.quantity - 1 }
  //         : product
  //     )
  //   );
  // };

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // const handleOrder = () => {
  //   alert("Your order has been placed!");
  //   setProducts([]);
  //   onClose();
  // };

  const showModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Drawer
        title={<Typography.Title level={3}>🛒 Shopping Cart</Typography.Title>}
        placement="right"
        onClose={onClose}
        visible={isDrawerVisible}
        width={650}
        bodyStyle={{ paddingBottom: 80, paddingTop: 20 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Typography.Title level={4}>
              Total:{" "}
              <span style={{ color: "#1890ff" }}>${totalPrice.toFixed(2)}</span>
            </Typography.Title>
            <Button
              type="primary"
              size="large"
              // onClick={handleOrder}
              icon={<IoIosSend />}
              block
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                borderRadius: "5px",
              }}
            >
              Place Order
            </Button>
          </div>
        }
      >
        {products.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={products}
            renderItem={(product) => (
              <List.Item key={product._id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={product.mainImageUrl}
                      shape="square"
                      size={64}
                    />
                  }
                  title={
                    <Typography.Text strong>
                      {product.productName}
                    </Typography.Text>
                  }
                  description={
                    <>
                      <Typography.Text>Price: ${product.price}</Typography.Text>
                      <br />
                      <Typography.Text>Color: {product.color}</Typography.Text>
                    </>
                  }
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="default"
                    shape="circle"
                    // onClick={() => decreaseQuantity(product._id)}
                  >
                    -
                  </Button>
                  <span style={{ margin: "0 12px", fontSize: "16px" }}>
                    {product.quantity}
                  </span>
                  <Button
                    type="default"
                    shape="circle"
                    // onClick={() => increaseQuantity(product._id)}
                  >
                    +
                  </Button>
                  <Space style={{ marginLeft: 12 }}>
                    <Button
                      shape="circle"
                      icon={<IoMdEye />}
                      onClick={() => showModal(product)}
                    />
                    <Popconfirm
                      title="Delete the product"
                      description="Are you sure to delete this product?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    >
                      <Button
                        shape="circle"
                        icon={<DeleteOutlined />}
                        danger
                        // onClick={() =>
                        //   setProducts(
                        //     products.filter((p) => p._id !== product._id)
                        //   )
                        // }
                      />
                    </Popconfirm>
                  </Space>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Typography.Text style={{ color: "#ff4d4f" }}>
            Your cart is empty.
          </Typography.Text>
        )}
      </Drawer>

      <Modal
        title={
          <Typography.Title level={3}>
            {selectedProduct?.productName}
          </Typography.Title>
        }
        visible={isModalVisible}
        onCancel={handleModalClose}
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
              <Typography.Text strong>Description:</Typography.Text>{" "}
              {selectedProduct.description}
            </Typography.Paragraph>
            <Divider />
            <Space size="middle" direction="vertical">
              <Typography.Text strong>
                Color: {selectedProduct.color}
              </Typography.Text>
              <Typography.Text strong>
                Price: ${selectedProduct.price}
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
              onClick={handleModalClose}
            >
              Close
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default memo(DrawerComponent);
