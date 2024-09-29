import { FC } from "react";
import { Carousel } from "antd";
import caruselImg1 from "../../assets/images/carusel1.jpg";
import caruselImg2 from "../../assets/images/carusel2.jpg";
import caruselImg3 from "../../assets/images/carusel3.jpg";

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

const XCarusel: FC = () => (
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
        <div
          className="font-dancing-script absolute bottom-24 right-6 transform translate-y-0 text-white text-2xl md:text-4xl p-4 rounded-lg z-10  "
          style={{
            animationDelay: `${index * 0.5}s`,
          }}
        >
          {slide.text}
        </div>
      </div>
    ))}
  </Carousel>
);

export default XCarusel;
