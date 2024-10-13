import CatagoriesSlider from "./CatagoriesSlider";
import { IFieldType, SideBar } from "./SideBar";
import { Content } from "antd/es/layout/layout";
import { Col, Form, Input, Layout, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from "../../store/api/product/product-api";
import { IProduct } from "../../store/api/product/modules";
import ProductCard from "../../components/ProductCard";
import InputComponent from "../../shared/components/form-components/InputComponent";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const Shop = () => {
  const [getPrducts, { data: productsData }] = useLazyGetProductsQuery<{
    data: IProduct[];
  }>({});

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    getValues,
  } = useForm<any>();

  // const [form] = Form.useForm();

  console.log("RERENTER SHOP");

  const productName = useDebounce(watch("productName"), 300);

  useEffect(() => {
    getPrducts({ productName });
  }, [productName]);

 const onFilter = (values: IFieldType) => {
   console.log("SHOP INDEX", values);
   
 };

  return (
    <>
      <CatagoriesSlider />
      <Content style={{marginTop: '20px'}}>

      <Row>
        <Col span={4}>
          
            <SideBar />
       
        </Col>
        <Col span={20}>main</Col>
      </Row>
      </Content>
    </>
  );
};

export default Shop;
