import { FC } from "react";
import { Carousel } from "antd";
import caruselImg2 from "../../assets/images/carusel2.jpg";
import caruselImg1 from "../../assets/images/carusel1.jpg";
import caruselImg3 from "../../assets/images/carusel3.jpg";

const XCarusel: FC = () => (
  <>
    <Carousel
      autoplay={true}
      autoplaySpeed={2000}
      dotPosition="right"
      infinite={true}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div style={{ position: "relative" }}>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <img
            src={caruselImg1}
            alt="First slide"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "4rem",
              padding: "10px 20px",
              borderRadius: "10px",
              zIndex: 1,
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            Your Look with Timeless
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <img
            src={caruselImg2}
            alt="Second slide"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "4rem",
              padding: "10px 20px",
              borderRadius: "10px",
              zIndex: 1,
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            Always Shine With Gems
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <img
            src={caruselImg3}
            alt="Third slide"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "4rem",
              padding: "10px 20px",
              borderRadius: "10px",
              zIndex: 1,
              fontFamily: "'Dancing Script', cursive",
            }}
          >
          Reward Yourself
          </div>
        </div>
      </div>
    </Carousel>
  </>
);

export default XCarusel;
