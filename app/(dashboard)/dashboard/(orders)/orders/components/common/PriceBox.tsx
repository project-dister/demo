import styles from "./PriceBox.module.scss";
import { BsCurrencyDollar } from "react-icons/bs";
interface PriceBoxProps {
  price: number;
}

const PriceBox: React.FC<PriceBoxProps> = ({ price }) => {
  return (
    <div className={styles.priceBox}>
      <BsCurrencyDollar className={`text-xl mr-1`} />
      <span className={`${styles.date}`}>{price}</span>
    </div>
  );
};

export default PriceBox;
