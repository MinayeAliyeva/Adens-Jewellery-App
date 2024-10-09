import { FC } from "react";
import { FaSave } from "react-icons/fa";
import { Button, Form, Input, Modal, Row, Col, Upload, Select } from "antd";
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
import { useGetCategoriesQuery } from "../../store/api/catagory/catagory-api";
import SelectBoxComponent from "../../components/SelectBoxComponent";
import { useGetBrandsQuery } from "../../store/api/brand/brand-api";

interface IProductDialog {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  product?: IProduct;
}

const ProductDialog: FC<IProductDialog> = ({ open, setOpen, product }) => {
  const [addProduct, { isLoading: isLoadingProduct }] = useAddProductMutation();
  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandsQuery();
  const [updateProductById, { isLoading: isLoadingUpdatedProduct }] = useUpdateProductByIdMutation();

  const { control } = useForm();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [mainImage, setMainImage] = useState<UploadFile | null>(null); // Track main image state

  const { data: categoriesData } = useGetCategoriesQuery();

  const handleChangeMainImage = (info: UploadChangeParam<UploadFile<File>>) => {
    setMainImage(info.file); // Set the main image
  };

  const handleChangeAdditions = (info: UploadChangeParam<UploadFile<File>>) => {
    setFileList(info.fileList); // Update additional images
  };

  const onFinish = async (values: any) => {
    
    const formData = new FormData();
    const formattedDate = dayjs(values.creationDate).format("DD.MM.YYYY");

    formData.append("productName", values.productName);
    formData.append("size", values.size);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("color", values.color || "");
    formData.append("brand", values.brand || "");
    formData.append("description", values.description || "");
    formData.append("stock", values.stock || 0);
    formData.append("weight", values.weight || 0);
    formData.append("dimensions", values.dimensions || 0);
    formData.append("warrantyDuration", values.warrantyDuration || "");
    formData.append("creationDate", formattedDate);

    // Append the main image if available

    if (mainImage) {
      formData.append("mainImageUrl", mainImage as any);
    }

    // Append additional images
    fileList.forEach((file: any) => {
      formData.append("additionalImages", file.originFileObj ?? file);
    });

    try {
      if (product?._id) {
        await updateProductById({ id: product._id, body: formData });
      } else {
        await addProduct(formData);
      }
      setOpen?.(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log({ product });

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
          category: product?.category?.name,
          color: product?.color,
          brand: product?.brand?.name,
          description: product?.description,
          stock: product?.stock,
          weight: product?.weight,
          dimensions: product?.dimensions,
          warrantyDuration: product?.warrantyDuration,
          creationDate: product?.creationDate
            ? dayjs(product.creationDate)
            : null,
          mainImage: product?.mainImageUrl,
          additionalImages: product?.additionalImages,
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
                options={sizeOptions}
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
              name="category"
              rules={[
                { required: true, message: "Category name is required!" },
              ]}
            >
              <SelectBox
                name="category"
                options={
                  categoriesData?.map((category) => ({
                    label: category?.name,
                    value: category?._id,
                  }))!
                }
                style={{ width: "100%" }}
                placeholder={"Enter category..."}
                defaultValue={product?.category?.name! ?? ""}
                allowClear={true}
                handleChange={(value) => form.setFieldsValue({ category: value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item label="Brand" name="brand">
          <SelectBox
                name="brand"
                options={
                  brandData?.map((brand) => ({
                    label: brand?.name,
                    value: brand?._id,
                  }))!
                }
                style={{ width: "100%" }}
                placeholder={"Enter brand..."}
                defaultValue={product?.category?.name! ?? ""}
                allowClear={true}
                handleChange={(value) => form.setFieldsValue({ brand: value })}
              />
            </Form.Item>
           
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
          <Form.Item label="Color" name="color">
              <Input placeholder="Enter color..." />
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
                defaultFileList={
                  product
                    ? [
                        {
                          uid: product?._id ?? "",
                          name: product?.productName ?? "",
                          status: "done",
                          url: product?.mainImageUrl,
                        },
                      ]
                    : undefined
                }
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
                defaultFileList={
                  product
                    ? Array.from({
                        length: product?.additionalImages.length,
                      }).map((_, i) => {
                        return {
                          uid: `${product?._id}#${i}`,
                          name: product?.productName ?? "",
                          status: "done",
                          url: product?.additionalImages[i],
                        };
                      })
                    : undefined
                }
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
