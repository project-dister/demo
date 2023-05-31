import styles from "./EditOffer.module.scss";

interface Props {
  title: string;
  handleOfferInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function Title({ title, handleOfferInputChange }: Props) {
  return (
    <div className="mt-4">
      <label>
        <p className="mb-2 font-light	text-gray-100">
          Add title for offer ({50 - title.length} character(s) left)
        </p>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleOfferInputChange}
          className={styles.inputField}
          minLength={15}
          maxLength={50}
          placeholder="Offer Title"
        />
      </label>
    </div>
  );
}
