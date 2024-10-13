import React, { FC } from "react";
import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import TypographyComponent from "../../components/TypographyComponent";
import SelectBoxComponent from "../../components/SelectBoxComponent";
import { useGetCategoriesQuery } from "../../store/api/catagory/catagory-api";
import SelectBox from "../../components/SelectBox";
import { useGetBrandsQuery } from "../../store/api/brand/brand-api";
import CheckBox from "./CheckBox";

export interface IFieldType {
  minPrice?: number;
  maxPrice?: number;
  password?: string;
  remember?: string;
  category?: string[];
  raiting?: string;
  brand?: string[];
  size?: string[];
  weight?: number;
  SideBar?: number;
  duration?: number;
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

interface ISideBarProps{
  onFilter?: (values: IFieldType) => void
}

export const SideBar: FC<ISideBarProps>= ({onFilter}) => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();
  const [form] = Form.useForm();
  const onFinish: FormProps<IFieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <Content
      style={{
        // width: "400px",
        // height: "100vh",
        padding: "0 24px",
        backgroundColor: "#f7f7f7",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
      }}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Title level={5}>Filter by Price</Title>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item<IFieldType> name="minPrice">
              <Input type="number" name="minPrice" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IFieldType> name="maxPrice">
              <Input type="number" name="maxPrice" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Form.Item<IFieldType> name="category">
          <TypographyComponent
            level={5}
            style={{ marginBottom: "12px" }}
            content=" Category"
          />
          <SelectBox
            name="category"
            placeholder={"Select Category..."}
            options={
              categoriesData?.map((category) => ({
                label: category.name,
                value: category.name,
              }))!
            }
            handleChange={(value) => form.setFieldsValue({ category: value })}
            style={{ width: "100%" }}
            mode="multiple"
            size="large"
          />
        </Form.Item>
        <Divider />
        <Form.Item<IFieldType> name="raiting">
          <TypographyComponent
            level={5}
            style={{ marginBottom: "12px" }}
            content=" Rating"
          />
          <SelectBox
            name="raiting"
            placeholder={"Select Raiting..."}
            options={raitingOptions}
            style={{ width: "100%" }}
            handleChange={(value) => form.setFieldsValue({ raiting: value })}
            size="large"
          />
        </Form.Item>
        <Divider />
        <Form.Item<IFieldType> name="brand">
          <TypographyComponent
            level={5}
            style={{ marginBottom: "12px" }}
            content="Brand"
          />
          <SelectBox
            name="brand"
            placeholder={"Select Brand..."}
            options={brandData?.map((brand) => ({
              label: brand.name,
              value: brand.name,
            }))}
            style={{ width: "100%" }}
            mode="multiple"
            handleChange={(value) => form.setFieldsValue({ brand: value })}
          />
        </Form.Item>

        <Form.Item name="size" valuePropName="checked">
          <TypographyComponent
            level={5}
            style={{ marginBottom: "12px" }}
            content="Size Options..."
          />
          <Row gutter={[8, 8]} justify="start">
            <Checkbox.Group
              onChange={(value: string[]) => {
                form.setFieldsValue({ size: value });
              }}
            >
              {sizes.map((option, idx) => (
                <Checkbox key={idx} value={option.value}>
                  {option?.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Row>
        </Form.Item>
        <Divider />
        <Row gutter={24}>
          <Col span={12}>
            <Typography.Text>Weight (g)</Typography.Text>
            <Form.Item<IFieldType> name="weight">
              <Input type="number" name="weight" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Typography.Text>SideBars (cm)</Typography.Text>
            <Form.Item<IFieldType> name="SideBar">
              <Input name="SideBar" type="number" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={12}>
            <Typography.Title level={5} style={{ marginBottom: "12px" }}>
              Warranty Duration
            </Typography.Title>
            <Form.Item<IFieldType> name="duration">
              <Input
                name="duration"
                type="number"
                placeholder="Warranty Duration"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};
