import { isEmpty } from "lodash";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Drawer,
  List,
  Button,
  Typography,
  Avatar,
  Space,
  Popconfirm,
} from "antd";
import { FC, useEffect, useState } from "react";
import { IoIosSend, IoMdEye } from "react-icons/io";
import { getUserFromToken } from "../../../shared/helpers/authStorage";
import {
  useAddProductToBasketMutation,
  useDeleteProductFromBasketMutation,
  useLazyGetBasketByUserIdQuery,
} from "../../../redux/api/basket/basket-api";
import {
  IBasketResponse,
  IProductInBasket,
} from "../../../redux/api/basket/models";
import { IProduct } from "../../../redux/api/product/models";
import { useDispatch } from "react-redux";
import { setBasketProductCount } from "../../../redux/features/basketProductCountSlice";
import { SpinComponent } from "../../../shared/components/SpinComponent";
import OrderModal from "../../../shared/components/OrderModal";
import SliderComponent from "../components/SliderComponent";
import WievModal from "../components/WievModal";

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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [shippingFee, setShippingFee] = useState<number>(0);

 

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
      getBasket({ id: userData?._id ?? "" });
    }
  }, [userData?._id, isDrawerVisible]);

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


  const doOrder = () => {
    setIsModalOpen(true);
  };

  const isLoading =
    isLoadingBasket ||
    isLoadingAddProductToBasket ||
    isLoadingDeleteProductFromBasket;

  return (
    <>
      <Drawer
        title={<Typography.Title level={3}>🛒 Shopping Card</Typography.Title>}
        placement="right"
        onClose={onClose}
        open={isDrawerVisible}
        width={650}
        style={{ paddingBottom: 10, paddingTop: 20 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <SliderComponent totalPrice={basketData?.totalPrice} setShippingFee={setShippingFee} />
            <Typography.Title level={4}>
              Total Amount:{" "}
              <span style={{ color: "rgb(64, 51, 29)" }}>
                ${basketData?.totalPrice}
              </span>
            </Typography.Title>
            <Button
              type="primary"
              size="large"
              icon={<IoIosSend />}
              disabled={isEmpty(basketData?.products)}
              block
              onClick={doOrder}
              style={{
                backgroundColor: `${isEmpty(basketData?.products) ? "rgb(128, 113, 72)" : "rgb(64, 51, 29)"}`,
                color: `${isEmpty(basketData?.products) ? "#fff" : "fff"}`,
                borderRadius: "5px",
              }}
            >
              Send Order
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
                      src={product?.productId?.mainImageUrl}
                      shape="square"
                      size={64}
                    />
                  }
                  title={
                    <Typography.Text strong>
                      {product?.productId?.productName}
                    </Typography.Text>
                  }
                  description={
                    <>
                      <Typography.Text>
                        Price: ${product?.productId?.price}
                      </Typography.Text>
                      <br />
                      <Typography.Text>
                        Color: {product?.productId?.color}
                      </Typography.Text>

                      <Typography.Text>
                        Category: {product?.productId?.catetogy}
                      </Typography.Text>
                      <Typography.Text>
                        Size: {product?.productId?.catetogy}
                      </Typography.Text>
                    </>
                  }
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="default"
                    shape="circle"
                    disabled={product?.quantity === 1}
                    onClick={() => setQuantity(product?.productId?._id, -1)}
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
                    onClick={() => setQuantity(product?.productId?._id, 1)}
                    style={{ margin: "0 5px" }}
                  >
                    +
                  </Button>
                  <Space style={{ marginLeft: 12 }}>
                    <Button
                      shape="circle"
                      icon={<IoMdEye />}
                      onClick={() =>
                        showSelectedProductInfoModal(product?.productId)
                      }
                      style={{ margin: "0 5px" }}
                    />
                    <Popconfirm
                      title="Ürünü sil"
                      description="Bu ürünü silmek istediğinize emin misiniz?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={() =>
                        onDeleteProductFromBasket(product?.productId?._id)
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
      <WievModal
        onCloseSelectedProductInfoModal={onCloseSelectedProductInfoModal}
        isModalVisible={isModalVisible}
        selectedProduct={selectedProduct}
      />
      <OrderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} basketData={basketData} shippingFee={shippingFee} onClose={onClose} />
    </>
  );
};

export default ShoppingPanel;
