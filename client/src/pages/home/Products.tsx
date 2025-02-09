import { useGetProductsQuery } from "../../redux/api/product/product-api";
import { IProduct } from "../../redux/api/product/models";
import { Row, Col, Typography } from "antd";
import ProductCard from "../../shared/components/ProductCard";
import Container from "../../shared/components/Container";

const Products = () => {
  const { data } = useGetProductsQuery<{ data: IProduct[] }>("");

  return (
    <Container>
      <Typography className="text-3xl font-bold my-8 font-dancing-script text-center">
        OUR COLLECTION
      </Typography>

      <Row gutter={[20, 40]} justify="center" className="bg-stone-700">
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
