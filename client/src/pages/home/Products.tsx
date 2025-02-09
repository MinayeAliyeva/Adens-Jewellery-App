import { useGetProductsQuery } from "../../redux/api/product/product-api";
import { IProduct } from "../../redux/api/product/models";
import { Row, Col, Typography } from "antd";
import ProductCard from "../../shared/components/ProductCard";
import Container from "../../shared/components/Container";

const Products = () => {
  const { data } = useGetProductsQuery<{ data: IProduct[] }>("");

  return (
    <Container
      style={{
        maxWidth: "2200px",
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        background: "red", 
        padding: "10px", 
        borderRadius: "10px", 
        overflow: "hidden", 
        flexWrap:"wrap"
      }}
    >
      <Typography className="text-3xl font-bold my-8 font-dancing-script text-center">
        OUR COLLECTION
      </Typography>

      <Row gutter={[50, 50]} justify="center">
        {data?.map?.((product: IProduct) => (
          <Col>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
