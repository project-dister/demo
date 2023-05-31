import Image from "next/image";
import { FaStar } from "react-icons/fa";
import styles from "./testimonials.module.scss";

interface TestimonialItemProps {
  img: string;
  name: string;
  occupation: string;
  rating: number;
  description: string;
}

export default function TestimonialItem({
  img,
  name,
  occupation,
  rating,
  description,
}: TestimonialItemProps) {
  return (
    <div className={`${styles.testimonialCard} cardBg`}>
      <div className={styles.imgContainer}>
        <Image src={img} alt={`${name}'s profile pic`} width={200} height={200} />
      </div>
      <div className={styles.infoBox}>
        <h3 className={styles.name}>{name}</h3>
        <span className={`${styles.occupation} orangeText`}>{occupation}</span>
        <div className={`${styles.rating} flex items-center space-x-1`}>
          {[...Array(rating)].map((_, i) => (
            <FaStar className={`${styles.ratingIcon} orangeText`} key={i} />
          ))}
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
