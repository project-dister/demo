import React, { useEffect, useState } from "react";
import styles from "./EditOffer.module.scss";

interface Props {
  category: string;
  handleOfferInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const categories = [
  "Blockchain",
  "Smart Contracts",
  "DeFi",
  "NFTs",
  "Web3 Frontend",
  "Web3 Backend",
  "Security",
  "Consultancy",
  "Education",
  "Community",
];

export default function Category({ category, handleOfferInputChange }: Props) {
  const [validatedCategory, setValidatedCategory] = useState(category);

  useEffect(() => {
    if (categories.includes(category)) {
      setValidatedCategory(category);
    } else {
      setValidatedCategory("other");
    }
  }, [category]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    if (categories.includes(value)) {
      handleOfferInputChange(e);
    } else {
      handleOfferInputChange({
        ...e,
        currentTarget: {
          ...e.currentTarget,
          value: "other",
        },
      });
    }
  };

  return (
    <div className="w-full sm:w-1/3">
      <label>
        <p className="mb-2 font-light	text-gray-100">Category</p>
        <select
          value={validatedCategory}
          id="category"
          onChange={handleCategoryChange}
          className={styles.inputField}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      </label>
    </div>
  );
}
