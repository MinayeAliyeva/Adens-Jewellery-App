import { Drawer, List, Button, Typography, Avatar, Divider, Modal } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC, memo, useState } from "react";
import { IoIosSend, IoMdEye } from "react-icons/io";

interface IProduct {
  _id: string;
  productName: string;
  price: number;
  color: string;
  description: string;
  mainImageUrl: string;
  quantity: number; // Miktar
}

interface IDrawerComponentProps {
  onClose: () => void;
  isDrawerVisible: boolean;
}

const productsData = [
  {
    productAvailability: {
      stores: [],
    },
    _id: "6705bfc22d3ae83342f5f2c0",
    productName: "Acton Romero",
    size: ["S"],
    price: 114,
    category: "6705aa844d856254fb5bd6c8",
    color: "Consectetur dolores ",
    comments: [],
    mainImageUrl: "http://localhost:8000/public/images/1728430018313_az.svg",
    additionalImages: [
      "http://localhost:8000/public/images/1728430018313_az.svg",
    ],
    brand: "Dolores eveniet ut ",
    description: "Et voluptates amet ",
    stock: 85,
    weight: 15,
    dimensions: 17,
    warrantyDuration: "Vero et et cillum ad",
    creationDate: "09.10.2024",
    priceHistory: [],
    __v: 0,
  },
];

const DrawerComponent: FC<IDrawerComponentProps> = ({
  onClose,
  isDrawerVisible,
}) => {
  const [products, setProducts] = useState<IProduct[]>(() =>
    productsData.map((product) => ({ ...product, quantity: 1 }))
  );

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const increaseQuantity = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleOrder = () => {
    console.log("Order placed:", products);
    alert("Your order has been placed!");
    setProducts([]);
    onClose();
  };

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
        title="Shopping Cart"
        placement="right"
        onClose={onClose}
        visible={isDrawerVisible}
        width={400}
      >
        {products.length > 0 ? (
          <>
            <List
              itemLayout="horizontal"
              dataSource={products}
              renderItem={(product) => (
                <List.Item key={product._id}>
                  <List.Item.Meta
                    avatar={<Avatar src={product.mainImageUrl} />}
                    title={product.productName}
                    description={`Color: ${product.color} | Price: $${product.price}`}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button onClick={() => decreaseQuantity(product._id)}>
                      -
                    </Button>
                    <span style={{ margin: "0 8px" }}>{product.quantity}</span>
                    <Button onClick={() => increaseQuantity(product._id)}>
                      +
                    </Button>
                    <Button
                      icon={<IoMdEye />}
                      onClick={() => showModal(product)}
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </List.Item>
              )}
            />
            <Divider />
            <Content style={{ position: "absolute", bottom: "20px" }}>
              <Typography.Title level={4} style={{ textAlign: "right" }}>
                Total Price: ${totalPrice.toFixed(2)}
              </Typography.Title>
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "10px" }}
                onClick={handleOrder}
                icon={<IoIosSend />}
              >
                Order It
              </Button>
            </Content>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Drawer>

      <Modal
        title={selectedProduct?.productName}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedProduct && (
          <div>
            <img
              src={selectedProduct.mainImageUrl}
              alt={selectedProduct.productName}
              style={{ width: "100%" }}
            />
            <p>{selectedProduct.description}</p>
            <p>Color: {selectedProduct.color}</p>
            <p>Price: ${selectedProduct.price}</p>
            <p>Stock: {selectedProduct.quantity}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default memo(DrawerComponent);
