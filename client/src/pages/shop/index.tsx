import "./index.css";
import CatagoriesSlider from "./CatagoriesSlider";
import DrawerComponent from "../../components/DrawerComponent";
import InputComponent from "../../shared/components/form-components/InputComponent";
import ProductCard from "../../components/ProductCard";
import RangeDrawerComponent from "../../components/Drawer";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbArrowsDownUp } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { IProduct } from "../../store/api/product/modules";
import { useLazyGetProductsQuery } from "../../store/api/product/product-api";
import { IFieldType, SideBar } from "./SideBar";

const Shop = () => {
  const params = new URLSearchParams();
  const [getPrducts, { data: productsData }] = useLazyGetProductsQuery<{
    data: IProduct[];
    // isLoading:boolean
  }>();
  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log("isLoadingProduct", isLoading);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    control,
    formState: { errors },
    watch,
    getValues,
    setError,
  } = useForm<{ productName: string }>({
    defaultValues: { productName: undefined },
  });

  const productName = useDebounce(watch("productName"), 300) ?? undefined;
  console.log("RERENDER D=SHOPP");

  useEffect(() => {
    if (productName && productName.length < 3) {
      setError("productName", {
        type: "manual",
        message: "Please enter at least 3 characters",
      });
    } else {
      setError("productName", { type: "manual", message: "" });
    }

    if (!productName || productName.length >= 3) {
      if (productName) params.append("productName", productName!);
      getPrducts(params.toString(), true);
    }
  }, [productName]);

  const onFilter = (values: IFieldType) => {
    console.log("values", values);

    const {
      categories,
      minPrice,
      maxPrice,
      raiting,
      brands,
      size,
      minWeight,
      maxWeight,
      dimention,
      duration,
    } = values;

    if (categories && categories?.length > 0) {
      categories.forEach((category) => params.append("category", category));
    }

    if (brands && brands.length > 0) {
      brands.forEach((brand) => params.append("brand", brand));
    }
    if (size && size.length > 0) {
      size.forEach((value) => params.append("size", value));
    }
    if (productName) params.append("productName", productName);
    if (minPrice) params.append("minPrice", minPrice.toString());
    if (maxPrice) params.append("maxPrice", maxPrice.toString());

    if (minWeight) params.append("minWeight", minWeight.toString());
    if (maxWeight) params.append("maxWeight", maxWeight.toString());

    if (duration) params.append("duration", duration.toString());
    if (dimention) params.append("dimention", dimention.toString());

    getPrducts(params.toString(), true);
    params.delete("category");
    params.delete("brand");
    params.delete("size");
    params.delete("productName");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("minWeight");
    params.delete("maxWeight");
    params.delete("duration");
    params.delete("dimention");
  };

  return (
    <>
      <CatagoriesSlider />
      <Content style={{ minHeight: "100vh", marginTop: "30px" }}>
        <Row>
          <Col
            span={5}
            style={{
              // width: "400px",
              // height: "100vh",
              padding: "0 24px",
              backgroundColor: "#f7f7f7",
              borderRight: "1px solid #ddd",
              overflowY: "auto",
              minHeight: "100vh",
            }}
          >
            <SideBar onFilter={onFilter} />
          </Col>

          <Col span={19}>
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
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ width: "450px" }}>
                  <InputComponent
                    style={{ padding: "7px 10px" }}
                    size="large"
                    name="productName"
                    suffix={<SearchOutlined style={{ fontSize: "30px" }} />}
                    control={control as any}
                    placeholder="Search product by name..."
                  />
                  {errors?.productName?.message && (
                    <Typography.Text style={{ color: "red", marginTop: "5px" }}>
                      {errors?.productName?.message}
                    </Typography.Text>
                  )}
                </div>
                //!Add
                <div style={{ width: "450px" }}>
                  <InputComponent
                    style={{ padding: "7px 10px" }}
                    size="large"
                    name="productName"
                    suffix={<SearchOutlined style={{ fontSize: "30px" }} />}
                    control={control as any}
                    placeholder="Search product by category name..."
                  />
                  {errors?.productName?.message && (
                    <Typography.Text style={{ color: "red", marginTop: "5px" }}>
                      {errors?.productName?.message}
                    </Typography.Text>
                  )}
                </div>
                <TbArrowsDownUp
                  style={{ fontSize: "30px" }}
                  onClick={() => setDrawerOpen(true)}
                />
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
            <RangeDrawerComponent 
              placement="bottom"
              open={drawerOpen}
              setOpen={setDrawerOpen}
            />
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Shop;
