import { FaStar } from "react-icons/fa";
import styles from "../user.module.scss";

interface RatingProps {
  rating: number;
  quantity: number;
}

export default function Rating({ rating, quantity }: RatingProps) {
  return (
    <div className={styles.rating}>
      <span className={styles.labelText}>Rating:</span>
      <p>
        <FaStar className="orangeText" /> {rating}
        <span className="font-light">({quantity})</span>
      </p>
    </div>
  );
}
