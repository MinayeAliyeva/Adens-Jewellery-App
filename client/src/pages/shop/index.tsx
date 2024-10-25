import { SearchOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { IFieldType, SideBar } from "./SideBar";
import CatagoriesSlider from "./CatagoriesSlider";
import { useDebounce } from "../../hooks/useDebounce";
import { IProduct } from "../../redux/api/product/modules";
import { useLazyGetProductsQuery } from "../../redux/api/product/product-api";
import InputComponent from "../../shared/components/form-components/InputComponent";
import ProductCard from "../../components/ProductCard";
import { ICheckboxComponentProps } from "../../components/Drawer";
import OpenDrawer from "./OpenDrawer";
import { useTranslation } from "react-i18next";

const Shop = () => {
 
  const params = useMemo(() => new URLSearchParams(), []) as  URLSearchParams;
  console.log({params: params.toString()});
  
  const [getPrducts, { data: productsData }] = useLazyGetProductsQuery<{
    data: IProduct[];
  }>();

  const {
    control,
    formState: { errors },
    watch,
    setError,
  } = useForm<{ productName: string }>({
    defaultValues: { productName: undefined },
  });

  const productName = useDebounce(watch("productName"), 300) ?? "";

  useEffect(() => {
    if (productName && productName.length < 3) {
      setError("productName", {
        type: "manual",
        message: "Please enter at least 3 characters",
      });
    } else {
      setError("productName", { type: "manual", message: "" });
    }

   if (!productName) params.delete("productName");
    if (!productName || productName.length >= 3) {
      if (productName) params.append("productName", productName!);
      
      getPrducts(params.toString());
    }
  }, [productName]);

  const clearFilterParams = (isFilter?: boolean) => {
    params.delete("category");
    params.delete("brand");
    params.delete("size");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("averageRating");
    params.delete("minWeight");
    params.delete("maxWeight");
    params.delete("duration");
    params.delete("dimention");
    getPrducts(params.toString(), true);
  };

  const clearSortingParams = () => {
    params.delete("sortPriceDesc");
    params.delete("sortPriceAsc");
    params.delete("sortRaitingDesc");
    params.delete("sortRaitingAsc");
    params.delete("sortCreateDateDesc");
    params.delete("sortCreatetDateAsc");
  };

  const onFilter = (values: IFieldType) => {
    const {
      categories,
      minPrice,
      maxPrice,
      averageRating,
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
    if (averageRating) params.append("averageRating", averageRating.toString());

    if (minWeight) params.append("minWeight", minWeight.toString());
    if (maxWeight) params.append("maxWeight", maxWeight.toString());

    if (duration) params.append("duration", duration.toString());
    if (dimention) params.append("dimention", dimention.toString());

    getPrducts(params.toString(), true);
  };

  const onSortong = (value: ICheckboxComponentProps) => {
    if(!value?.option || !value.sort)return;
    clearSortingParams();
    params.append(`${value?.option}`, value?.sort);
    getPrducts(params.toString(), true); 
  }
  const { t } = useTranslation();
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
            <SideBar onFilter={onFilter} clearFilterParams={clearFilterParams} />
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
                    placeholder={t("Search product by name...")}
                  />
                  {errors?.productName?.message && (
                    <Typography.Text style={{ color: "red", marginTop: "5px" }}>
                      {errors?.productName?.message}
                    </Typography.Text>
                  )}
                </div>
       
                <OpenDrawer onCloseTakeDrawerValues={onSortong}/>
                {/* <TbArrowsDownUp
                  style={{ fontSize: "30px" }}
                  onClick={() => setDrawerOpen(true)}
                /> */}
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
