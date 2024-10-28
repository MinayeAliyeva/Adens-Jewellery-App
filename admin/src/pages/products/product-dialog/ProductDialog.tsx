import SelectBox from "../../../utils/components/SelectBox";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Upload,
} from "antd";
import { DatePickerProps } from "antd/es/date-picker";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { isEqual } from "lodash";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSave } from "react-icons/fa";
import { useGetBrandsQuery } from "../../../store/api/brand/brand-api";
import { useGetCategoriesQuery } from "../../../store/api/catagory/catagory-api";
import { IProduct } from "../../../store/api/product/modules";
import { ButtonComponent } from "../../../utils/components/ButtonComponent";
import { sizeOptions } from "../data";

import {
  useAddProductMutation,
  useUpdateProductByIdMutation,
} from "../../../store/api/product/product-api";

dayjs.extend(customParseFormat);

const disabledDate: DatePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().startOf("day");
};

const dateFormat = "DD.MM.YYYY";
const customFormat: DatePickerProps["format"] = (value) =>
  value ? value.format(dateFormat) : "";
interface IProductDialog {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  product?: IProduct;
}

const ProductDialog: FC<IProductDialog> = ({ open, setOpen, product }) => {
  const transformedData = useMemo(
    () => ({
      productName: product?.productName,
      size: product?.size,
      price: product?.price,
      dimensions: product?.dimensions,
      category: product?.category?._id,
      brand: product?.brand?._id,
      color: product?.color,
      description: product?.description,
      totalQty: product?.totalQty,
      weight: product?.weight,
      warrantyDuration: product?.warrantyDuration,
      creationDate:
        dayjs(product?.creationDate, dateFormat) || product?.creationDate,
      mainImage: product?.mainImageUrl,
      additionalImages: product?.additionalImages,
    }),
    [product]
  );

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [mainImage, setMainImage] = useState<UploadFile | null>(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [addProduct, { isLoading: isLoadingProduct }] = useAddProductMutation();
  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandsQuery();
  const [updateProductById, { isLoading: isLoadingUpdatedProduct }] =
    useUpdateProductByIdMutation();
  const { data: categoriesData } = useGetCategoriesQuery();

  const handleChangeMainImage = (info: UploadChangeParam<UploadFile<File>>) => {
    setMainImage(info.file);
  };

  const handleChangeAdditions = (info: UploadChangeParam<UploadFile<File>>) => {
    setFileList(info.fileList);
  };

  const onFinish = useCallback(
    async (values: any) => {
      const isUpdateProduct = isEqual(transformedData, values);
      const formData = new FormData();
      const formattedDate = dayjs(
        values.creationDate ?? product?.creationDate
      ).format(dateFormat);
      formData.append("productName", values.productName);
      formData.append("size", values.size);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("color", values.color || "");
      formData.append("brand", values.brand || "");
      formData.append("description", values.description || "");
      formData.append("totalQty", values.totalQty || 0);
      formData.append("weight", values.weight || 0);
      formData.append("dimensions", values.dimensions || 0);
      formData.append("warrantyDuration", values.warrantyDuration || "");
      formData.append("creationDate", formattedDate);

      if (mainImage) {
        formData.append("mainImageUrl", mainImage as any);
      }

      fileList.forEach((file: any) => {
        formData.append("additionalImages", file.originFileObj ?? file);
      });

      try {
        if (product?._id && !isUpdateProduct) {
          await updateProductById({ id: product._id, body: formData }).then(
            () => {
              message.success("Product update!!!");
            }
          );
        } else if (!product?._id) {
          await addProduct(formData).then((res) => {
            message.success("Product created!!!");
            form.resetFields();
          });
        }
        setOpen?.(false);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [fileList, mainImage, product?._id, product?.creationDate, transformedData]
  );

  const onCancel = () => {
    setOpen?.(false);
    form.resetFields();
  };

  //! SHOW ERRORS
  // throw Error("")

  return (
    <Modal
      title={product ? t("Edit Product") : t("Add Product")}
      centered
      open={open}
      onOk={onCancel}
      onCancel={onCancel}
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
          category: product?.category?._id,
          color: product?.color,
          brand: product?.brand?._id,
          description: product?.description,
          totalQty: product?.totalQty,
          weight: product?.weight,
          dimensions: product?.dimensions,
          warrantyDuration: product?.warrantyDuration,
          creationDate: product?.creationDate
            ? dayjs(product?.creationDate, dateFormat)
            : null,
          mainImage: product?.mainImageUrl,
          additionalImages: product?.additionalImages,
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={t("Product Name")}
              name="productName"
              rules={[
                { required: true, message: t("Product name is required!") },
              ]}
            >
              <Input placeholder={t("Enter product name")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("Size Options")}
              name="size"
              rules={[{ required: true, message: t("Size is required!") }]}
            >
              <SelectBox
                name="size"
                options={sizeOptions}
                style={{ width: "100%" }}
                placeholder={t("Enter size...")}
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
              label={t("Price")}
              name="price"
              rules={[{ required: true, message: t("Price is required!") }]}
            >
              <Input type="number" placeholder={t("Enter price")} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Dimensions" name="dimensions">
              <Input type="number" placeholder={t("Enter dimension...")} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={t("Category Name")}
              name="category"
              rules={[
                { required: true, message: t("Category name is required!") },
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
                defaultValue={
                  product?.category?.name! ?? t("Enter category...")
                }
                allowClear={true}
                handleChange={(value) =>
                  form.setFieldsValue({ category: value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("Brand")}
              name="brand"
              rules={[{ required: true, message: t("Brand  is required!") }]}
            >
              <SelectBox
                name="brand"
                options={
                  brandData?.map((brand) => ({
                    label: brand?.name,
                    value: brand?._id,
                  }))!
                }
                style={{ width: "100%" }}
                defaultValue={product?.category?.name! ?? t("Enter brand...")}
                allowClear={true}
                handleChange={(value) => form.setFieldsValue({ brand: value })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={t("Color")} name="color">
              <Input placeholder={t("Enter color...")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("Description")} name="description">
              <Input.TextArea placeholder={t("Enter product description...")} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={t("Total count")}
              name="totalQty"
              rules={[
                { required: true, message: t("Total count is required!") },
              ]}
            >
              <Input
                type="number"
                placeholder={t("Enter totalQty number...")}
                name="totalQty"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("Weight (mm)")} name="weight">
              <Input type="number" placeholder={t("Enter weight...")} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={t("Warranty Duration")} name="warrantyDuration">
              <Input type="number" placeholder={t("Enter warranty duration")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("Creation Date")} name="creationDate">
              <DatePicker
                name="creationDate"
                disabledDate={disabledDate}
                style={{ width: "100%" }}
                format={customFormat}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={t("Main Image")}
              name="mainImage"
              rules={[
                { required: true, message: t("Main image is required!") },
              ]}
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
                <Button icon={<UploadOutlined />}>
                  {t("Upload Main Image")}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("Additional Images")}
              name="additionalImages"
              rules={[
                { required: true, message: t("Main image is required!") },
              ]}
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
                    ? Array?.from({
                        length: product?.additionalImages?.length!,
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
                  {t("Upload Additional Images")}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <ButtonComponent
            htmlType="submit"
            buttonText={product ? t("Update Product") : t("Add Product")}
            loading={
              isLoadingProduct || isLoadingUpdatedProduct || isLoadingBrand
            }
            icon={<FaSave />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(ProductDialog);
