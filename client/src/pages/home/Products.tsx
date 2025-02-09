import { useGetProductsQuery } from "../../redux/api/product/product-api";
import { IProduct } from "../../redux/api/product/models";
import { Row, Col, Typography, Layout } from "antd";
import ProductCard from "../../shared/components/ProductCard";
import Container from "../../shared/components/Container";
const { Content } = Layout;

const Products = () => {
  const { data } = useGetProductsQuery<{ data: IProduct[] }>("");

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography className="text-3xl font-bold my-8 font-dancing-script text-center">
        OUR COLLECTION
      </Typography>

      <Row gutter={[50, 50]}  justify={"center"}>
        {data?.map?.((product: IProduct) => (
          <Col key={product?._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
