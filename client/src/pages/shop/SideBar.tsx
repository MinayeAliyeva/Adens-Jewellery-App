import { FC } from "react";
import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import TypographyComponent from "../../components/TypographyComponent";
import { useGetCategoriesQuery } from "../../store/api/catagory/catagory-api";
import SelectBox from "../../components/SelectBox";
import { useGetBrandsQuery } from "../../store/api/brand/brand-api";
import { ClearOutlined, SendOutlined } from "@ant-design/icons";

export interface IFieldType {
  minPrice?: number;
  maxPrice?: number;
  password?: string;
  remember?: string;
  categories?: string[];
  raiting?: string;
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
  raiting: "",
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
}

export const SideBar: FC<ISideBarProps> = ({ onFilter }) => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();
  const [form] = Form.useForm();

  const onFinish: FormProps<IFieldType>["onFinish"] = (values) => {
    onFilter?.(values!);
  };
  //!TODO: Add CHECKING Min Weight  INPUT MIN MAX +++
  //! Button style and side bar style editing  calback take loading and give submit button loading={loading} and disble={loading}

  const clearFilters = () => {
    form.resetFields();
  };

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
          Filter by Price
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
                  // if(!maxPrice && minPrice) {
                  //   form.setFieldValue("maxPrice", 0)
                  //   return
                  // };
                  form.setFieldValue(
                    "maxPrice",
                    maxPrice >= minPrice ? maxPrice : minPrice
                  );
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <hr />

        <Row gutter={24} style={{ marginTop: "15px" }}>
          <Col span={12}>
            <Form.Item<IFieldType> name="categories">
              <TypographyComponent
                level={5}
                style={{ marginBottom: "15px" }}
                content=" Category"
              />
              <SelectBox
                name="categories"
                placeholder={"Select Category..."}
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
            <Form.Item<IFieldType> name="raiting">
              <TypographyComponent
                level={5}
                style={{ marginBottom: "15px" }}
                content=" Rating"
              />
              <SelectBox
                name="raiting"
                placeholder={"Select Raiting..."}
                options={raitingOptions}
                style={{ width: "100%" }}
                handleChange={(value) =>
                  form.setFieldsValue({ raiting: value })
                }
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <Row gutter={24} style={{ marginTop: "15px" }}>
          <Col span={12}>
            <Form.Item<IFieldType> name="brands">
              <TypographyComponent
                level={5}
                style={{ marginBottom: "15px" }}
                content="Brand"
              />
              <SelectBox
                name="brands"
                placeholder={"Select Brand..."}
                options={brandData?.map((brand) => ({
                  label: brand.name,
                  value: brand?._id,
                }))}
                style={{ width: "100%" }}
                mode="multiple"
                handleChange={(value) => form.setFieldsValue({ brands: value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="size" valuePropName="checked">
              <TypographyComponent
                level={5}
                style={{ marginBottom: "15px" }}
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
          </Col>
        </Row>
        <hr />
        <Row gutter={24} style={{ marginTop: "15px" }}>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content="Min Weight (g)"
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
              content="Max Weight (g)"
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
              />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <Row gutter={24} style={{ margin:'15px' }}>
          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content="Warranty Duration"
            />
            <Form.Item<IFieldType> name="duration">
              <Input
                name="duration"
                type="number"
                placeholder="Warranty Duration"
                size="large"
                min={0}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <TypographyComponent
              level={5}
              style={{ marginBottom: "15px" }}
              content=" Dimentions size (cm)"
            />

            <Form.Item<IFieldType> name="dimention">
              <Input
                placeholder="Dimention..."
                name="dimention"
                type="number"
                size="large"
                min={0}
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
              style={{ backgroundColor: "#70b3bf" }}
              size="large"
              icon={<SendOutlined />}
            >
              Submit
            </Button>
            <Button
              type="primary"
              htmlType="button"
              style={{ backgroundColor: "#bf9b6b", width: "180px" }}
              size="large"
              icon={<ClearOutlined />}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Content>
  );
};
