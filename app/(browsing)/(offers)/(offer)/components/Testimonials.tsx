import styles from "./testimonials.module.scss";
import TestimonialItem from "./TestimonialItem";

export default function Testimonials() {
  const testimonials = [
    {
      img: "/images/1.png",
      name: "HubaFerencz",
      occupation: "Frontend Engineer",
      rating: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      img: "/images/2.png",
      name: "SatoshiNakamoto",
      occupation: "Blockchain Engineer",
      rating: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      img: "/images/3.png",
      name: "DoeJohn",
      occupation: "UI/UX Designer",
      rating: 3,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
  ];
  return (
    <div className={`${styles.testimonials} lg:grid lg:grid-cols-1`}>
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center">
          <div className={`${styles.title} orangeText`}>Testimonials</div>
          <div className={styles.subtitle}>
            Previous customers of SatoshiNakamoto
          </div>
        </div>
      </div>

      <div className={`${styles.cards} xl:flex-col xl:items-center`}>
        {testimonials.map((testimonial, i) => (
          <TestimonialItem
            key={i}
            img={testimonial.img}
            name={testimonial.name}
            occupation={testimonial.occupation}
            rating={testimonial.rating}
            description={testimonial.description}
          />
        ))}
      </div>
    </div>
  );
}
