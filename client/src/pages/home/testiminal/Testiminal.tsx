import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestiminalCart from "./TestiminalCart";
import { useTranslation } from "react-i18next";
//!BAckend ile yazilacak
const testimonials = [
  {
    id: 1,
    quote: "Bu ürün harika! Çok memnun kaldım.",
    author: "Ali Veli",
  },
  {
    id: 2,
    quote: "Hızlı teslimat ve mükemmel kalite.",
    author: "Ayşe Yılmaz",
  },
  {
    id: 3,
    quote: "Kesinlikle tavsiye ediyorum!",
    author: "Mehmet Demir",
  },
  {
    id: 4,
    quote: "Müşteri hizmetleri çok yardımcı oldu.",
    author: "Zeynep Çelik",
  },
  {
    id: 5,
    quote: "Fiyat/performans oranı mükemmel.",
    author: "Ahmet Yılmaz",
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  const { t } = useTranslation();
  return (
    <div
      className="testimonial-container"
      style={{ padding: "20px", height: "500px" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {t("Customer Reviews")}
      </h2>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "120px 0",
        }}
      >
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <TestiminalCart testimonial={testimonial} key={testimonial?.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
