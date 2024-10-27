import { FC } from "react";
import { Carousel } from "antd";
import Typography from "antd/es/typography/Typography";
import { useTranslation } from "react-i18next";
import Container from "./Container";

const caruselImg1 = "/assets/images/carusel1.jpg";
const caruselImg2 = "/assets/images/carusel2.jpg";
const caruselImg3 = "/assets/images/carusel3.jpg";

const slides = [
  {
    img: caruselImg1,
    alt: "First slide",
    text: "Discover your unique style with Timeless. Our curated collection enhances your natural beauty and ensures you always look your best, no matter the occasion.",
  },
  {
    img: caruselImg2,
    alt: "Second slide",
    text: "Shine bright like a diamond! With our exquisite range of gems, you can elevate your look and make a statement that reflects your personality and elegance.",
  },
  {
    img: caruselImg3,
    alt: "Third slide",
    text: "Indulge yourself with our exclusive selections. Because you deserve to treat yourself to the finest things in life, let us help you find the perfect reward for your achievements.",
  },
];

const CaruselComponent: FC = () => {
  const { t } = useTranslation(); 

  return (
    <Carousel
      autoplay
      autoplaySpeed={3000}
      infinite
      className="w-screen h-screen"
      dots={true}
      pauseOnHover={false}
      effect="fade"
      dotPosition="right"
    >
      {slides.map((slide, index) => (
        <div key={index} className="relative w-screen h-screen overflow-hidden">
          <img
            src={slide.img}
            alt={slide.alt}
            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
          />
          <Container width="50%" backgroundColor="red">
            <Typography
              className="font-dancing-script absolute bottom-24 right-6 transform translate-y-0 text-white text-2xl md:text-4xl p-4 rounded-lg z-10"
              style={{
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {t(slide.text)} 
            </Typography>
          </Container>
        </div>
      ))}
    </Carousel>
  );
};

export default CaruselComponent;
