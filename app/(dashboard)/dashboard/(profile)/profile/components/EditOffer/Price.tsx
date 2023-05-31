import styles from "./EditOffer.module.scss";

interface Props {
  price: number;
  handleOfferInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function Price({ price, handleOfferInputChange }: Props) {
  return (
    <div className="w-full sm:w-1/3">
      <label>
        <p className="mb-2 font-light	text-gray-100">Price</p>
        <input
          type="number"
          value={price}
          id="price"
          onChange={handleOfferInputChange}
          placeholder="$USD"
          className={styles.inputField}
        />
      </label>
    </div>
  );
}
