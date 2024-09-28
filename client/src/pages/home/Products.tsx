import ProductCard from "./ProductCard";
import productImg1 from "../../assets/images/product1.jpg";

const Products = () => {
  const products = [
    {
      productImg: productImg1,
      productName: "Product 1",
      productPrice: "$20",
      productDetails: "Material: Cotton",
      productId:1
    },
    {
      productImg: productImg1,
      productName: "Product 2",
      productPrice: "$25",
      productDetails: "Material: Silk",
      productId:2
    },
    {
      productImg: productImg1,
      productName: "Product 3",
      productPrice: "$30",
      productDetails: "Material: Wool",
      productId:3
    },
    {
      productImg: productImg1,
      productName: "Product 4",
      productPrice: "$35",
      productDetails: "Material: Polyester",
      productId:4
    },
    {
      productImg: productImg1,
      productName: "Product 5",
      productPrice: "$40",
      productDetails: "Material: Leather",
      productId:5
    },
    {
      productImg: productImg1,
      productName: "Product 6",
      productPrice: "$45",
      productDetails: "Material: Denim",
      productId:6
    },
  ];

  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "2rem", margin: "20px 0" }}>
        Our Collection
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          padding: "20px",
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
