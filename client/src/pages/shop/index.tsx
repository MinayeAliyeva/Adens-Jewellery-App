import CatagoriesSlider from "./CatagoriesSlider";
import { IFieldType, SideBar } from "./SideBar";
import { Content } from "antd/es/layout/layout";
import { Col, Row } from "antd";
import { useLazyGetProductsQuery } from "../../store/api/product/product-api";
import { IProduct } from "../../store/api/product/modules";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import ProductCard from "../../components/ProductCard";
import InputComponent from "../../shared/components/form-components/InputComponent";
import { SearchOutlined } from "@ant-design/icons";

const Shop = () => {
  const [getPrducts, { data: productsData }] = useLazyGetProductsQuery<{
    data: IProduct[];
  }>({});

  const {
    control,
    formState: { errors },
    watch,
    getValues,
  } = useForm<any>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);  

  const productName = useDebounce(watch("productName"), 300);

  useEffect(() => {
    if (productName && productName.length < 3) {
      setErrorMessage("Arama yapmak için en az 3 harf giriniz."); 
    } else {
      setErrorMessage(null); 
    }

    if (!productName || productName.length >= 3) {
      getPrducts({ productName }, true);
    }
  }, [productName]);

  const onFilter = (values: IFieldType) => {
    const {
      category,
      minPrice,
      maxPrice,
      raiting,
      brand,
      size,
      weight,
      dimention,
      duration,
    } = values;

    const filterParams = {
      categoryNames: category ? category : undefined,
      brand: brand ? brand : undefined,
      productName: productName || undefined,
      min: minPrice || undefined,
      max: maxPrice || undefined,
      weight: weight || undefined,
      dimention: dimention || undefined,
      duration: duration || undefined,
      size: size ? size : undefined,
    };
    getPrducts(filterParams, true);
  };

  return (
    <>
      <CatagoriesSlider />
      <Content style={{ marginTop: "20px" }}>
        <Row>
          <Col span={4}>
            <SideBar onFilter={onFilter} />
          </Col>

          <Col span={20}>
            <Content
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "space-between",
                padding: " 0 20px",
                marginBottom: "40px",
              }}
            >
              <div style={{ width: "450px" }}>
                <InputComponent
                  style={{ padding: "7px 10px" }}
                  size="large"
                  name="productName"
                  suffix={<SearchOutlined style={{ fontSize: "30px" }} />}
                  control={control}
                  placeholder="Search product by name..."
                />
                {errorMessage && (  
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {errorMessage}
                  </p>
                )}
              </div>
            </Content>
            <Content
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "space-between",
                padding: " 0 20px",
              }}
            >
              {productsData?.map((product) => (
                <ProductCard product={product} />
              ))}
            </Content>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Shop;
