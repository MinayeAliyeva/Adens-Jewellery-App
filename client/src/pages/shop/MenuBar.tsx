import {
  Divider,
  Typography,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { PriceFilter } from "./PriceFilter";
import CheckBox from "./CheckBox";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import SelectBoxComponent from "../../components/SelectBoxComponent";
import { useGetCategoriesQuery } from "../../store/api/catagory/catagory-api";
import TypographyComponent from "../../components/TypographyComponent";
import ButtonComponent from "../../components/ButtonComponent";

const { Option } = Select;

const MenuBar: React.FC = () => {
  const sizes = ["M", "L", "S"];

  // Durum yönetimi için
  const [rating, setRating] = useState<string>("");

  const raitingOptions = [
    {
      label: "1 Star",
      value: "1",
      desc: "Poor - 1 Star",
    },
    {
      label: "2 Stars",
      value: "2",
      desc: "Fair - 2 Stars",
    },
    {
      label: "3 Stars",
      value: "3",
      desc: "Good - 3 Stars",
    },
    {
      label: "4 Stars",
      value: "4",
      desc: "Very Good - 4 Stars",
    },
    {
      label: "5 Stars",
      value: "5",
      desc: "Excellent - 5 Stars",
    },
  ];

  const brandOptions = [
    {
      label: "Zara",
      value: "zara",
      // emoji: "🇨🇳",
      desc: "Zara",
    },
    {
      label: "Zara",
      value: "zara",
      // emoji: "🇨🇳",
      desc: "Zara",
    },
  ];

  const avelibilityOptions = [
    {
      label: "Online",
      value: "online",
      desc: "Online",
    },
    {
      label: "Store",
      value: "store",
      desc: "store",
    },
  ];
  const { data: categoriesData } = useGetCategoriesQuery();
  return (
    <div
      style={{
        width: "400px",
        height: "100vh",
        padding: "24px",
        backgroundColor: "#f7f7f7",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
      }}
    >
      <PriceFilter />
      <Divider />
      <TypographyComponent
        level={5}
        style={{ marginBottom: "12px" }}
        content=" Category"
      />
      <SelectBoxComponent
        name="category"
        placeholder={"Select Category..."}
        options={categoriesData}
        style={{ width: "100%" }}
        mode="multiple"
      />
      <Divider />{" "}
      <TypographyComponent
        level={5}
        style={{ marginBottom: "12px" }}
        content=" Rating"
      />
      <SelectBoxComponent
        name="raiting"
        placeholder={"Select Raiting..."}
        options={raitingOptions}
        style={{ width: "100%" }}
      />
      <Divider />
      <TypographyComponent
        level={5}
        style={{ marginBottom: "12px" }}
        content="Brand"
      />
      <SelectBoxComponent
        name="brand"
        placeholder={"Select Brand..."}
        options={brandOptions}
        style={{ width: "100%" }}
        mode="multiple"
      />
      <Divider />
      <TypographyComponent
        level={5}
        style={{ marginBottom: "12px" }}
        content=" Product Avelibility"
      />
      <SelectBoxComponent
        name="avelibility"
        placeholder={"Select Avelibility..."}
        options={avelibilityOptions}
        style={{ width: "100%" }}
      />
      <Divider />
      <TypographyComponent
        level={5}
        style={{ marginBottom: "12px" }}
        content="Size Options..."
      />
      <Row gutter={[8, 8]} justify="start">
        {sizes?.map((size) => (
          <Col key={size}>
            <CheckBox size={size} />
          </Col>
        ))}
      </Row>
      <Divider />
      <TypographyComponent
        level={5}
        style={{ marginBottom: "12px" }}
        content="Jewellery Specifications..."
      />
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col span={12}>
          <Typography.Text>Weight (g)</Typography.Text>
          <InputNumber
            placeholder="Weight"
            size="large"
            min={1}
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Col>

        <Col span={12}>
          <Typography.Text>Dimensions (cm)</Typography.Text>
          <InputNumber
            placeholder="Dimensions"
            size="large"
            min={1}
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Col>
      </Row>
      <Typography.Title level={5} style={{ marginBottom: "12px" }}>
        Warranty Duration
      </Typography.Title>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col span={12}>
          <Typography.Text>Duration (Months)</Typography.Text>
          <InputNumber
            placeholder="Warranty Duration"
            size="large"
            min={1}
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Col>
      </Row>
      {/* <Button
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        style={{
          width: "100%",
          borderRadius: "8px",
          backgroundColor: "#1890ff",
          color: "#fff",
        }}
      >
        Apply Filters
      </Button> */}
      <ButtonComponent
        buttonText={"Apply Filters"}
        style={{
          width: "100%",
          borderRadius: "8px",
          backgroundColor: "#1890ff",
          color: "#fff",
        }}
        icon={<SearchOutlined />}
          size="large"
      />
    </div>
  );
};

export default MenuBar;
