import { FC } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useAddProductMutation } from "../../store/api/product/product-api";
import SelectBox from "../../components/SelectBox";
import { sizeOptions } from "./data";
import DatePickerComponent from "../../components/DatePickerComponent";
import dayjs from "dayjs";

interface IProductDialog {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDialog: FC<IProductDialog> = ({ open, setOpen }) => {
  const [addProduct] = useAddProductMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const [creationDate, setCreationDate] = useState<dayjs.Dayjs | null>(null);
  const handleChange = (info: any) => {
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
    const formattedDate = creationDate ? creationDate.format("YYYY-MM-DD") : new Date().toISOString(); 
    formData.append("productName", values.productName);
    formData.append("size", values.size ?? "S");
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

    console.log({ formData });
    console.log({ values });

    try {
      await addProduct(formData);
      // setOpen?.(false);
    } catch (error) {}
  };

  return (
    <Modal
      title="Add Product"
      centered
      open={true}
      onOk={() => setOpen?.(false)}
      onCancel={() => setOpen?.(false)}
      width={1000}
    >
      <Form
        form={form}
        name="create-product"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ favorite: false }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[{ required: true, message: "Product name is required!" }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="SizeOptions "
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
              <Input type="number" placeholder="Fiyatı Giriniz"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Dimensions " name="dimensions">
             <Input type="number" placeholder="Enter dimension... "/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Catagory Name"
              name="categoryName"
              rules={[{ required: true, message: "Price is required!" }]}
            >
              <Input placeholder="Enter Catagory..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Color" name="color">
              <Input placeholder="Enter Color..." />
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
              <Input.TextArea
                placeholder="Enter product description..."
                // rows={4}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Stok" name="stock">
              <Input type="number" placeholder="Enter stock number..."/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Weight(mm)" name="weight">
            <Input type="number" placeholder="Enter weight..."/>

            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Warranty Duration " name="warrantyDuration">
              <Input placeholder="Enter Warranty Duration" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CreationDate" name="creationDate">
            <DatePickerComponent 
                style={{ width: "100%" }} 
                onChange={(date) => setCreationDate(date)} // tarih güncelleniyor
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Main Image"
              name="mainImageUrl"
              rules={[{ required: true, message: "Main image required!" }]}
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
            <Form.Item label="Additional Images" name="additionalImages">
              <Upload
                accept="image/*"
                multiple
                showUploadList={true}
                onChange={handleChangeAdditions}
                beforeUpload={() => false}
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
          <Button type="primary" htmlType="submit">
            Save Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductDialog;
