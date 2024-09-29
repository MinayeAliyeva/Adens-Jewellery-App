import ProductCard from "./ProductCard";
import productImg1 from "../../assets/images/product1.jpg";
import productImg2 from "../../assets/images/carusel3.jpg";
import productImg3 from "../../assets/images/carusel2.jpg";

const Products = () => {
  const products = [
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 1",
      productPrice: "$20",
      productDetails: "Material: Cotton",
      productId: 1,
      availableColors: ['#FF5733', '#33FF57', '#3357FF'], 
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 2",
      productPrice: "$25",
      productDetails: "Material: Silk",
      productId: 2,
      availableColors: ['#FF33A1', '#3373FF', '#FFC300'], 
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 3",
      productPrice: "$30",
      productDetails: "Material: Wool",
      productId: 3,
      availableColors: ['#FF5733', '#33FF57', '#3357FF'], 
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 4",
      productPrice: "$35",
      productDetails: "Material: Polyester",
      productId: 4,
      availableColors: ['#FF33A1', '#3373FF', '#FFC300'], 
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 5",
      productPrice: "$40",
      productDetails: "Material: Leather",
      productId: 5,
      availableColors: ['#FF5733', '#33FF57', '#3357FF'], 
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 6",
      productPrice: "$45",
      productDetails: "Material: Denim",
      productId: 6,
      availableColors: ['#FF33A1', '#3373FF', '#FFC300'], 
    },
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-8">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-5">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
