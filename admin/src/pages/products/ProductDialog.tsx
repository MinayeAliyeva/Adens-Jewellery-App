import { FC } from "react";
import { FaSave } from "react-icons/fa";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Upload,
  Typography,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
} from "../../store/api/product/product-api";
import SelectBox from "../../components/SelectBox";
import { sizeOptions } from "./data";
import dayjs from "dayjs";
import { DatePickerControlled } from "../../components/DatePickerControlled";
import { useForm } from "react-hook-form";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { ButtonComponent } from "../../components/ButtonComponent";
import { IProduct } from "../../store/api/product/modules";

interface IProductDialog {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  product?: IProduct;
  isDelete?: boolean;
}

const ProductDialog: FC<IProductDialog> = ({
  open,
  setOpen,
  product,
  isDelete,
}) => {
  const [addProduct] = useAddProductMutation();
  const { getValues, control, reset } = useForm();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [deleteProductById] = useDeleteProductMutation();
  const handleDelete = (id: string = "") => {
    deleteProductById(id).then((res) => {
      setOpen?.(false);
    });
  };
  const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
    if (info?.file) {
      setFileList([info?.file, ...fileList]);
    }
  };

  const handleChangeAdditions = (info: any) => {
    let updatedFileList = [...info.fileList];
    if (updatedFileList?.length) {
      setFileList([...fileList, ...updatedFileList]);
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    const formattedDate = dayjs(values.creationDate).format("DD.MM.YYYY");
    formData.append("productName", values.productName);
    formData.append("size", values.size);
    formData.append("price", values.price);
    formData.append("categoryName", values.categoryName || "");
    formData.append("color", values.color || "");
    formData.append("brand", values.brand || "");
    formData.append("description", values.description || "");
    formData.append("stock", values.stock || 0);
    formData.append("weight", values.weight || 0);
    formData.append("dimensions", values.dimensions || 0);
    formData.append("warrantyDuration", values.warrantyDuration || "");
    formData.append("creationDate", formattedDate);
    fileList.forEach((file: any) => {
      formData.append("images", file.originFileObj ?? file);
    });

    try {
      if (product) {
        //!update sorgusu
      } else {
        await addProduct(formData);
      }
      setOpen?.(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      title={
        isDelete
          ? "Are you sure delete?"
          : product
          ? "Edit Product"
          : "Add Product"
      }
      centered
      open={open}
      onOk={() => setOpen?.(false)}
      onCancel={() => setOpen?.(false)}
      width={1000}
      footer={null}
    >
      {isDelete ? (
        //!componente cixar
        <Card style={{ width: "100%", padding: 20 }}>
          <Typography.Title level={3} style={{ marginBottom: 20 }}>
            Product Details
          </Typography.Title>
          <Row gutter={24}>
            <Col span={24}>
              <Typography.Text strong>Product Name:</Typography.Text>{" "}
              {product?.productName}
              <img
                src={product?.mainImageUrl}
                alt={product?.productName}
                style={{
                  width: "100%",
                  height: "350px",
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Typography.Text strong>Price:</Typography.Text> {product?.price}{" "}
              TL
            </Col>
            <Col span={12}>
              <Typography.Text strong>Category:</Typography.Text>{" "}
              {product?.categoryName}
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Typography.Text strong>Size:</Typography.Text> {product?.size}
            </Col>
            <Col span={12}>
              <Typography.Text strong>Color:</Typography.Text> {product?.color}
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Typography.Text strong>Brand:</Typography.Text> {product?.brand}
            </Col>
            <Col span={12}>
              <Typography.Text strong>Stock:</Typography.Text> {product?.stock}
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Typography.Text strong>Weight:</Typography.Text>{" "}
              {product?.weight} kg
            </Col>
            <Col span={12}>
              <Typography.Text strong>Dimensions:</Typography.Text>{" "}
              {product?.dimensions} cm
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Typography.Text strong>Warranty Duration:</Typography.Text>{" "}
              {product?.warrantyDuration}
            </Col>
            <Col span={12}>
              <Typography.Text strong>Creation Date:</Typography.Text>{" "}
              {product?.creationDate
                ? dayjs(product.creationDate).format("DD.MM.YYYY")
                : "N/A"}
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: 20 }}>
            <Col>
              <ButtonComponent
                style={{ marginRight: 10 }}
                onClick={() => setOpen?.(false)}
                buttonText="    Cancel"
              />
              <ButtonComponent
                onClick={() => handleDelete(product?._id)}
                type="primary"
                buttonText="Delete"
                danger
              />
            </Col>
          </Row>
        </Card>
      ) : (
        <Form
          form={form}
          name="create-product"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            productName: product?.productName,
            size: product?.size,
            price: product?.price,
            categoryName: product?.categoryName,
            color: product?.color,
            brand: product?.brand,
            description: product?.description,
            stock: product?.stock,
            weight: product?.weight,
            dimensions: product?.dimensions,
            warrantyDuration: product?.warrantyDuration,
            creationDate: product?.creationDate
              ? dayjs(product.creationDate)
              : null,
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[
                  { required: true, message: "Product name is required!" },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Size Options"
                name="size"
                rules={[{ required: true, message: "Size is required!" }]}
              >
                <SelectBox
                  name="size"
                  sizeOptions={sizeOptions}
                  style={{ width: "100%" }}
                  placeholder={"Enter size..."}
                  mode="multiple"
                  allowClear={true}
                  handleChange={(value) => form.setFieldsValue({ size: value })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Price is required!" }]}
              >
                <Input type="number" placeholder="Enter price" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Dimensions" name="dimensions">
                <Input type="number" placeholder="Enter dimension..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Category Name"
                name="categoryName"
                rules={[
                  { required: true, message: "Category name is required!" },
                ]}
              >
                <Input placeholder="Enter category..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Color" name="color">
                <Input placeholder="Enter color..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Brand" name="brand">
                <Input placeholder="Enter brand..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <Input.TextArea placeholder="Enter product description..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Stock" name="stock">
                <Input type="number" placeholder="Enter stock number..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Weight (mm)" name="weight">
                <Input type="number" placeholder="Enter weight..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Warranty Duration" name="warrantyDuration">
                <Input placeholder="Enter warranty duration" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Creation Date" name="creationDate">
                <DatePickerControlled
                  style={{ width: "100%" }}
                  control={control}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Main Image"
                name="mainImageUrl"
                rules={[{ required: true, message: "Main image is required!" }]}
              >
                <Upload
                  accept="image/*"
                  showUploadList={true}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  maxCount={1}
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Upload Main Image</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Additional Images">
                <Upload
                  accept="image/*"
                  showUploadList={true}
                  onChange={handleChangeAdditions}
                  beforeUpload={() => false}
                  multiple
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>
                    Upload Additional Images
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <ButtonComponent
              buttonText={product ? "Update Product" : "Add Product"}
              htmlType="submit"
              type="primary"
              icon={<FaSave />}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ProductDialog;
