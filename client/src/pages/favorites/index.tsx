import {  Layout, Typography } from "antd";
import FavoriteList from "./FavoriteList";
const productImg1 = "/assets/images/product1.jpg";
const productImg2 = "/assets/images/carusel3.jpg";
const backgroundFavorite = "/assets/images/bg-favorite.jpg";

const Favorite = () => {
  const favoriteProducts = [
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 1",
      productPrice: "$20",
      productDiscountedPrice: "$15",
      productDetails: "Material: Cotton",
      productId: 1,
      totalQty: 10,
      discount: 25,
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 2",
      productPrice: "$25",
      productDiscountedPrice: "$20",
      productDetails: "Material: Silk",
      productId: 2,
      totalQty: 5,
      discount: 20,
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 3",
      productPrice: "$30",
      productDiscountedPrice: "$25",
      productDetails: "Material: Wool",
      productId: 3,
      totalQty: 0,
      discount: 16,
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 4",
      productPrice: "$35",
      productDiscountedPrice: "$30",
      productDetails: "Material: Polyester",
      productId: 4,
      totalQty: 8,
      discount: 14,
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 5",
      productPrice: "$40",
      productDiscountedPrice: "$32",
      productDetails: "Material: Leather",
      productId: 5,
      totalQty: 2,
      discount: 20,
    },
    {
      productImg: productImg1,
      productImgHover: productImg2,
      productName: "Product 6",
      productPrice: "$45",
      productDiscountedPrice: "$40",
      productDetails: "Material: Denim",
      productId: 6,
      totalQty: 0,
      discount: 11,
    },
  ];
  return (
    <>
      <Layout
        style={{
          backgroundImage: `url(${backgroundFavorite})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.Title
          level={1}
          style={{ color: "white", textAlign: "center" }}
        >
          Wishlist
        </Typography.Title>
      </Layout>
      <Layout >
        {favoriteProducts?.map((product) => {
          return <FavoriteList product={product} />;
        })}
      </Layout>
    </>
  );
};

export default Favorite;
