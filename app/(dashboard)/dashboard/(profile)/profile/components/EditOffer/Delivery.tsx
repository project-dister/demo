import styles from "./EditOffer.module.scss";

interface Props {
  deliveryDate: number;
  handleOfferInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function Delivery({
  deliveryDate,
  handleOfferInputChange,
}: Props) {
  return (
    <div className="w-full sm:w-1/3 sm:px-2">
      <label>
        <p className="mb-2 font-light	text-gray-100">Delivery</p>
        <input
          type="number"
          id="deliveryDate"
          value={deliveryDate}
          onChange={handleOfferInputChange}
          placeholder="minuteS"
          className={styles.inputField}
        />
      </label>
    </div>
  );
}
