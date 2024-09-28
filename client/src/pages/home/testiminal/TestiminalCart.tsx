import { FC } from "react";
import { FaRegStar } from "react-icons/fa";
import img from "../../../assets/images/newsletter-image.jpg";
interface ITestiminalCartProps {
  testimonial: { id: number; quote: string; author: string };
}
const TestiminalCart: FC<ITestiminalCartProps> = ({ testimonial }) => {
  return (
    <div
      key={testimonial.id}
      style={{
        padding: "20px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        marginBottom: "70px",
      }}
    >
      <img
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
        src={img}
        alt=""
      />

      <div>
        {" "}
        <div>
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </div>
        <blockquote style={{ fontStyle: "italic", fontSize: "1.2rem" }}>
          "{testimonial.quote}"
        </blockquote>
        <cite
          style={{ display: "block", marginTop: "10px", fontWeight: "bold" }}
        >
          - {testimonial.author}
        </cite>
      </div>
    </div>
  );
};

export default TestiminalCart;
