import { useGetProductsQuery } from "../../redux/api/product/product-api";
import { IProduct } from "../../redux/api/product/modules";
import { Row, Col, Typography, Layout } from "antd";
import ProductCard from "../../shared/components/ProductCard";
const { Content } = Layout;

const Products = () => {
  const { data } = useGetProductsQuery<{ data: IProduct[] }>("");

  return (
    <Content
      style={{
        paddingLeft: "140px",
        margin: "auto",
      }}
    >
      <Typography className="text-3xl font-bold my-8 font-dancing-script text-center">
        OUR COLLECTION
      </Typography>

      <Row gutter={[30, 30]}>
        {data?.map?.((product: IProduct) => (
          <Col key={product?._id}  xs={24} sm={12} md={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Content>
  );
};

export default Products;
