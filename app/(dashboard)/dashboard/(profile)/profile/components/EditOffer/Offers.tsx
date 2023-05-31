"use client";

import { FiEdit3 } from "react-icons/fi";
import styles from "./SquareCard.module.scss";
import Image from "next/image";
type Props = {
  offers: Offer[];
  onEditClick: (offer: Offer) => void;
};

export default function Offers({ offers, onEditClick }: Props) {
  const handleEditClick = (offer: Offer) => {
    onEditClick(offer);
  };

  return (
    <div className="flex flex-wrap mt-4">
      {offers.map((offer, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2">
          <div className=" aspect-w-1 aspect-h-1 rounded-md overflow-hidden relative">
            <div className={styles.squareCard}>
              <Image
                src={offer.images[0]}
                alt={offer.title}
                className={styles.image}
                width={200}
                height={200}
              />
            </div>

            <div className="absolute top-2 right-2 p-1">
              <div
                className={`${styles.squareCardIcon} cardBg p-1 rounded-lg lightWhiteText`}
                onClick={() => handleEditClick(offer)}
              >
                <FiEdit3 size={30} className="p-1" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
