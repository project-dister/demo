import styles from "./EditOffer.module.scss";

interface Props {
  description: string;
  handleOfferInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export default function Description({
  description,
  handleOfferInputChange,
}: Props) {
  return (
    <div className="w-full md:w-1/2">
      <label>
        <p className="mb-2 font-light	text-gray-100">
          Description ({300 - description.length} character(s) left)
        </p>
        <textarea
          value={description}
          id="description"
          onChange={handleOfferInputChange}
          className={`${styles.inputField} h-52`}
          minLength={100}
          maxLength={300}
          placeholder="Offer Description"
        />
      </label>
    </div>
  );
}
