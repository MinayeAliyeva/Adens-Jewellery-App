import ProductCard from "./ProductCard";
const  productImg1 = "/assets/images/product1.jpg";
const productImg2 = "/assets/images/carusel3.jpg";
const  productImg3 = "/assets/images/carusel2.jpg";


const Products = () => {
  const products = [
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 1",
      productPrice: "$20",
      productDiscountedPrice: "$15", // İndirimli fiyat
      productDetails: "Material: Cotton",
      productId: 1,
      availableColors: ['#FF5733', '#33FF57', '#3357FF'], 
      stock: 10, // Stok durumu
      discount: 25 // İndirim oranı
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 2",
      productPrice: "$25",
      productDiscountedPrice: "$20",
      productDetails: "Material: Silk",
      productId: 2,
      availableColors: ['#FF33A1', '#3373FF', '#FFC300'], 
      stock: 5,
      discount: 20
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 3",
      productPrice: "$30",
      productDiscountedPrice: "$25",
      productDetails: "Material: Wool",
      productId: 3,
      availableColors: ['#FF5733', '#33FF57', '#3357FF'], 
      stock: 0, // Stokta yok
      discount: 16
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 4",
      productPrice: "$35",
      productDiscountedPrice: "$30",
      productDetails: "Material: Polyester",
      productId: 4,
      availableColors: ['#FF33A1', '#3373FF', '#FFC300'], 
      stock: 8,
      discount: 14
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 5",
      productPrice: "$40",
      productDiscountedPrice: "$32",
      productDetails: "Material: Leather",
      productId: 5,
      availableColors: ['#FF5733', '#33FF57', '#3357FF'], 
      stock: 2,
      discount: 20
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 6",
      productPrice: "$45",
      productDiscountedPrice: "$40",
      productDetails: "Material: Denim",
      productId: 6,
      availableColors: ['#FF33A1', '#3373FF', '#FFC300'], 
      stock: 0, // Stokta yok
      discount: 11
    },
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-8">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-5">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
