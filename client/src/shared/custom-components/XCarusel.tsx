import { FC } from "react";
import { Carousel } from "antd";
import caruselImg1 from "../../assets/images/carusel1.jpg";
import caruselImg2 from "../../assets/images/carusel2.jpg";
import caruselImg3 from "../../assets/images/carusel3.jpg";

const XCarusel: FC = () => (
  <>
    <Carousel
      style={{ width: "100%", minWidth: "100%" }}
      autoplay={true}
      dotPosition="right"
      infinite={true}
    >
      <div style={{ height: "500px", width: "100%", overflow: "hidden" }}>
        <img
          src={caruselImg1}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ height: "500px", width: "100%", overflow: "hidden" }}>
        <img
          src={caruselImg2}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ height: "500px", width: "100%", overflow: "hidden" }}>
        <img
          src={caruselImg3}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </Carousel>
  </>
);

export default XCarusel;
