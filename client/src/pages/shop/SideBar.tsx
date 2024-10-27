import { FC } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { useGetCategoriesQuery } from "../../redux/api/catagory/catagory-api";
import { useGetBrandsQuery } from "../../redux/api/brand/brand-api";
import { ClearOutlined, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TypographyComponent from "../../shared/components/TypographyComponent";
import SelectBox from "../../shared/components/form-components/SelectBox";

export interface IFieldType {
  minPrice?: number;
  maxPrice?: number;
  password?: string;
  remember?: string;
  categories?: string[];
  averageRating?: string;
  brands?: string[];
  size?: string[];
  minWeight?: number;
  maxWeight?: number;
  dimention?: number;
  duration?: number;
}

const initialValues: IFieldType = {
  minPrice: 0,
  maxPrice: 0,
  password: "",
  remember: "",
  categories: [],
  averageRating: "",
  brands: [],
  size: [],
  minWeight: 0,
  maxWeight: 0,
  dimention: 0,
  duration: 0,
};

const sizes = [
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "S", value: "S" },
];

const raitingOptions = [
  {
    label: "1 Star",
    value: "1",
  },
  {
    label: "2 Stars",
    value: "2",
  },
  {
    label: "3 Stars",
    value: "3",
  },
  {
    label: "4 Stars",
    value: "4",
  },
  {
    label: "5 Stars",
    value: "5",
  },
];

interface ISideBarProps {
  onFilter?: (values: IFieldType) => void;
  clearFilterParams?: () => void;
}

export const SideBar: FC<ISideBarProps> = ({ onFilter, clearFilterParams }) => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();
  const [form] = Form.useForm();

  const onFinish: FormProps<IFieldType>["onFinish"] = (values) => {
    clearFilterParams?.();
    onFilter?.(values!);
  };

  const clearFilters = () => {
    form.resetFields();
    clearFilterParams?.();
  };
  const { t } = useTranslation();
  return (
    <Content
      style={{
        height: "75vh",
      }}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Title level={5} style={{ marginTop: "15px" }}>
          {t("Filter by Price")}
        </Title>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item<IFieldType> name="minPrice">
              <Input
                type="number"
                name="minPrice"
                size="large"
                min={0}
                placeholder="min price"
                onBlur={(e) => {
                  const maxPrice = form.getFieldValue("maxPrice") || 0;
                  const minPrice = Number(e.target.value);
                  if (!minPrice || !maxPrice) return;
                  form.setFieldValue(
                    "minPrice",
                    minPrice >= maxPrice ? maxPrice : minPrice
                  );
                }}
                onFocus={() => {
                  form.setFieldValue("minPrice", null);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IFieldType>
              name="maxPrice"
              rules={[{ required: false }]}
            >
              <Input
                type="number"
                name="maxPrice"
                size="large"
                min={0}
                placeholder="max price"
                onBlur={(e) => {
                  const minPrice = form.getFieldValue("minPrice") || 0;
                  const maxPrice = Number(e.target.value);
                  if (!maxPrice || !minPrice) return;
                  form.setFieldValue(
                    "maxPrice",
                    maxPrice >= minPrice ? maxPrice : minPrice
                  );
                }}
                onFocus={() => {
                  form.setFieldValue("maxPrice", null);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <hr />

        <Row gutter={24} style={{ marginTop: "15px" }}>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content={t("Category")}
            />
            <Form.Item<IFieldType> name="categories">
              <SelectBox
                name="categories"
                placeholder={t("Select Category...")}
                options={
                  categoriesData?.map((categories) => ({
                    label: categories.name,
                    value: categories?._id,
                  }))!
                }
                handleChange={(value) =>
                  form.setFieldsValue({ categories: value })
                }
                style={{ width: "100%" }}
                mode="multiple"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content={t("Rating")}
            />
            <Form.Item<IFieldType> name="averageRating">
              <SelectBox
                name="averageRating"
                placeholder={t("Select Raiting...")}
                options={raitingOptions}
                style={{ width: "100%" }}
                handleChange={(value) =>
                  form.setFieldsValue({ averageRating: value })
                }
                size="large"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <Row gutter={24} style={{ marginTop: "15px" }}>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content={t("Brand")}
            />
            <Form.Item<IFieldType> name="brands">
              <SelectBox
                name="brands"
                placeholder={t("Select Brand...")}
                options={brandData?.map((brand) => ({
                  label: brand.name,
                  value: brand?._id,
                }))}
                size="large"
                style={{ width: "100%" }}
                mode="multiple"
                handleChange={(value) => form.setFieldsValue({ brands: value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content={t("Size Options...")}
            />
            <Form.Item name="size" valuePropName="checked">
              <Row gutter={[8, 8]} justify="start">
                <Checkbox.Group
                  onChange={(value: string[]) => {
                    form.setFieldsValue({ size: value });
                  }}
                >
                  {sizes?.map((option, idx) => (
                    <Checkbox key={idx} value={option.value}>
                      {option?.label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <Row gutter={24} style={{ marginTop: "15px" }}>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content={t("Min Weight (g)")}
            />
            <Form.Item<IFieldType> name="minWeight">
              <Input
                onBlur={(e) => {
                  const maxWeight = form.getFieldValue("maxWeight") || 0;
                  const minWeight = Number(e.target.value);
                  if (!minWeight || !maxWeight) return;
                  form.setFieldValue(
                    "minWeight",
                    minWeight >= maxWeight ? maxWeight : minWeight
                  );
                }}
                onFocus={() => {
                  form.setFieldValue("minWeight", null);
                }}
                type="number"
                name="minWeight"
                size="large"
                placeholder="min weight"
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content={t("Max Weight (g)")}
            />
            <Form.Item<IFieldType> name="maxWeight">
              <Input
                type="number"
                name="maxWeight"
                size="large"
                placeholder="max weight"
                min={0}
                onBlur={(e) => {
                  const minWeight = form.getFieldValue("minWeight") || 0;
                  const maxWeight = Number(e.target.value);
                  if (!minWeight || !maxWeight) return;
                  form.setFieldValue(
                    "minWeight",
                    maxWeight >= minWeight ? maxWeight : minWeight
                  );
                }}
                onFocus={() => {
                  form.setFieldValue("maxWeight", null);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <Row gutter={24} style={{ marginTop: "15px" }}>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content={t("Warranty Duration")}
            />
            <Form.Item<IFieldType> name="duration">
              <Input
                name="duration"
                type="number"
                placeholder="Warranty Duration..."
                size="large"
                min={0}
                onFocus={() => {
                  form.setFieldValue("duration", null);
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content={t("Dimentions size (cm)")}
            />

            <Form.Item<IFieldType> name="dimention">
              <Input
                placeholder="Dimention..."
                name="dimention"
                type="number"
                size="large"
                min={0}
                onFocus={() => {
                  form.setFieldValue("dimention", null);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <hr />

        <Form.Item>
          <Space
            style={{
              display: "flex",
              gap: "25px",
              margin: "8px",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={form.isFieldsTouched(true)}
              style={{ backgroundColor: "#70b3bf" }}
              size="large"
              icon={<SendOutlined />}
            >
              {t("Submit")}
            </Button>
            <Button
              type="primary"
              htmlType="button"
              style={{ backgroundColor: "#bf9b6b", width: "180px" }}
              size="large"
              icon={<ClearOutlined />}
              onClick={clearFilters}
            >
              {t("Clear Filters")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Content>
  );
};
