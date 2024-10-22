import { isEmpty } from "lodash";
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
import { Dispatch, FC, memo, SetStateAction, useEffect, useState } from "react";
import { IoIosSend, IoMdEye } from "react-icons/io";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import {
  useAddProductToBasketMutation,
  useDeleteProductFromBasketMutation,
  useLazyGetBasketByUserIdQuery,
} from "../../../redux/api/basket/basket-api";
import { SpinComponent } from "../../../components/SpinComponent";
import {
  IBasketResponse,
  IProductInBasket,
} from "../../../redux/api/basket/modules";
import { IProduct } from "../../../redux/api/product/modules";
import { useDispatch } from "react-redux";
import { setBasketProductCount } from "../../../redux/features/basketProductCountSlice";

interface IDrawerComponentProps {
  onClose: () => void;
  isDrawerVisible: boolean;
}

const ShoppingPanel: FC<IDrawerComponentProps> = ({
  onClose,
  isDrawerVisible,
}) => {
  const dispatch = useDispatch();
  const userData = getUserFromToken();

  const [getBasket, { data: basketData, isLoading: isLoadingBasket }] =
    useLazyGetBasketByUserIdQuery<{
      data: IBasketResponse;
      isLoading: boolean;
    }>();
    
  const [addProductToBasket, { isLoading: isLoadingAddProductToBasket }] =
    useAddProductToBasketMutation({});

  const [
    deleteProductFromBasket,
    { isLoading: isLoadingDeleteProductFromBasket },
  ] = useDeleteProductFromBasketMutation({});

  useEffect(() => {
    if (isDrawerVisible && userData?._id) {
      getBasket({ id: userData?._id ?? "" })
    }
  }, [userData?._id, isDrawerVisible]);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = basketData?.products?.map(
    (product: IProductInBasket) => product
  );

  const setQuantity = (productId: string, quantity: number) => {
    addProductToBasket({
      userId: userData?._id ?? "",
      productId,
      quantity,
    }).then((res) => {
      if (isEmpty(res?.data)) return;
      getBasket({ id: userData?._id ?? "" });
    });
  };

  const showSelectedProductInfoModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const onCloseSelectedProductInfoModal = () => {
    setSelectedProduct(null);
    setIsModalVisible(false);
  };
  
  const onDeleteProductFromBasket = (productId: string) => {
    deleteProductFromBasket({ userId: userData?._id ?? "", productId }).then(
      (res) => {
        if (isEmpty(res?.data)) return;
        getBasket({ id: userData?._id ?? "" }).then((res) => {
          dispatch(setBasketProductCount(res?.data?.products?.length ?? 0));
        });
      }
    );
  };
  
  const isLoading =
    isLoadingBasket ||
    isLoadingAddProductToBasket ||
    isLoadingDeleteProductFromBasket;

  return (
    <>
      <Drawer
        title={
          <Typography.Title level={3}>🛒 Alışveriş Sepeti</Typography.Title>
        }
        placement="right"
        onClose={onClose}
        visible={isDrawerVisible}
        width={650}
        bodyStyle={{ paddingBottom: 80, paddingTop: 20 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Typography.Title level={4}>
              Toplam:{" "}
              <span style={{ color: "#1890ff" }}>
                ${basketData?.totalPrice}
              </span>
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
        <SpinComponent loading={isLoading}>
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
                    onClick={() => setQuantity(product.productId._id, -1)}
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
                    onClick={() => setQuantity(product.productId._id, 1)}
                    style={{ margin: "0 5px" }}
                  >
                    +
                  </Button>
                  <Space style={{ marginLeft: 12 }}>
                    <Button
                      shape="circle"
                      icon={<IoMdEye />}
                      onClick={() =>
                        showSelectedProductInfoModal(product.productId)
                      }
                      style={{ margin: "0 5px" }}
                    />
                    <Popconfirm
                      title="Ürünü sil"
                      description="Bu ürünü silmek istediğinize emin misiniz?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={() =>
                        onDeleteProductFromBasket(product.productId._id)
                      }
                    >
                      <Button shape="circle" icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                  </Space>
                </div>
              </List.Item>
            )}
          />
        </SpinComponent>
      </Drawer>
      <Modal
        title={
          <Typography.Title level={3}>
            {selectedProduct?.productName}
          </Typography.Title>
        }
        onClose={onCloseSelectedProductInfoModal}
        onCancel={onCloseSelectedProductInfoModal}
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
              onClick={onCloseSelectedProductInfoModal}
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
