import { FC } from "react";
import { FaSave } from "react-icons/fa";
import { Button, Form, Input, Modal, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  useAddProductMutation,
  useUpdateProductByIdMutation,
} from "../../store/api/product/product-api";
import SelectBox from "../../components/SelectBox";
import { sizeOptions } from "./data";
import dayjs from "dayjs";
import { DatePickerControlled } from "../../components/DatePickerControlled";
import { useForm } from "react-hook-form";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { ButtonComponent } from "../../components/ButtonComponent";
import { IProduct } from "../../store/api/product/modules";
import { omit } from "lodash";

interface IProductDialog {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  product?: IProduct;
}

const ProductDialog: FC<IProductDialog> = ({ open, setOpen, product }) => {
  const [addProduct, { isLoading: isLoadingProduct }] = useAddProductMutation();
  const { control } = useForm();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [mainImage, setMainImage] = useState<UploadFile | null>(null); // Track main image state

  const [updateProductById, { isLoading: isLoadingUpdatedProduct }] =
    useUpdateProductByIdMutation();

  const handleChangeMainImage = (info: UploadChangeParam<UploadFile<File>>) => {
    console.log("info main", info);

    setMainImage(info.file); // Set the main image
  };

  const handleChangeAdditions = (info: UploadChangeParam<UploadFile<File>>) => {
    console.log("info add", info);

    setFileList(info.fileList); // Update additional images
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

    // Append the main image if available
    console.log("mainImage.originFileObj", mainImage?.originFileObj);

    if (mainImage) {
      console.log("daxil mainImage", mainImage);

      formData.append("mainImageUrl", mainImage as any);
    }

    // Append additional images
    fileList.forEach((file: any) => {
      console.log("file.originFileObj", file.originFileObj);

      formData.append("additionalImages", file.originFileObj ?? file);
    });
  console.log("formData update", formData);
  
    console.log({ values });
    console.log({ formData });

    try {
      if (product?._id) {
        await updateProductById({ id: product._id, body: formData });
      } else {
        console.log("ADD", formData);

        await addProduct(formData);
      }
      setOpen?.(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      title={product ? "Edit Product" : "Add Product"}
      centered
      open={open}
      onOk={() => setOpen?.(false)}
      onCancel={() => setOpen?.(false)}
      width={1000}
      footer={null}
    >
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
          mainImage: product?.mainImageUrl,
          additionalImages: product?.additionalImages
        }}
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
              name="mainImage"
              rules={[{ required: true, message: "Main image is required!" }]}
            >
              <Upload
                accept="image/*"
                showUploadList={true}
                onChange={handleChangeMainImage}
                listType="picture"
                beforeUpload={() => false}
                maxCount={1}
                defaultFileList={product ? [{
                  uid: product?._id ?? '',
                  name: product?.productName ?? "",
                  status: 'done',
                  url: product?.mainImageUrl,
                }]: undefined}
              >
                <Button icon={<UploadOutlined />}>Upload Main Image</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Additional Images"
              name="additionalImages"
              rules={[{ required: true, message: "Main image is required!" }]}
            >
              <Upload
                accept="image/*"
                showUploadList={true}
                onChange={handleChangeAdditions}
                beforeUpload={() => false}
                multiple
                listType="picture"
                defaultFileList={product ? 
                  Array.from({length: product?.additionalImages.length}).map((_,i)=>{
                   console.log({i,addition: product?.additionalImages});
                   
                    return {
                      uid: product?._id ?? '',
                    name: product?.productName ?? "",
                    status: 'done',
                    url: product?.additionalImages[i],
                    }
                  })
                 : undefined}
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
            htmlType="submit"
            buttonText={product ? "Update Product" : "Add Product"}
            loading={isLoadingProduct || isLoadingUpdatedProduct}
            icon={<FaSave />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductDialog;
