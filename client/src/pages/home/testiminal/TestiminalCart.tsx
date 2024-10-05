import { FC } from "react";
import { FaRegStar } from "react-icons/fa";

const img =  "./assets/images/newsletter-image.jpg";

interface ITestimonialCartProps {
  testimonial: { id: number; quote: string; author: string };
}

const TestimonialCart: FC<ITestimonialCartProps> = ({ testimonial }) => {
  return (
    <div className="flex items-center p-5 mb-14 text-center" key={testimonial.id}>
      <img
        className="rounded-full w-24 h-24"
        src={img}
        alt={testimonial.author} 
      />

      <div className="ml-4">
        <div className="flex">
          <FaRegStar className="text-yellow-500" />
          <FaRegStar className="text-yellow-500" />
          <FaRegStar className="text-yellow-500" />
        </div>
        <blockquote className="italic text-lg">
          "{testimonial.quote}"
        </blockquote>
        <cite className="block mt-2 font-bold">
          - {testimonial.author}
        </cite>
      </div>
    </div>
  );
};

export default TestimonialCart;
