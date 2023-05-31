import { FaStar } from "react-icons/fa";
import styles from "./OfferCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import getOffer from "@/lib/getOffer";

export default async function OfferCard({
  offerId,
  category,
}: {
  offerId: string;
  category: string;
}) {
  const offer = await getOffer(category, offerId);

  return (
    <div className={styles.card}>
      <Link href={`/category/${category}/${offer.offerId}`}>
        <div className={styles.imgBx}>
          <Image
            src={offer.images[0]}
            alt={offer.title}
            className={styles.image}
            width={300}
            height={300}
          />
        </div>
        <h2 className={styles.shortTitle}>{offer.title.slice(0, 20)}...</h2>
        <div className={styles.contentBx}>
          <h2>{offer.title}</h2>
          <div className={styles.popupContainer}>
            <p className={styles.startsAt}>starts at</p>
            <div className={styles.infoContainer}>
              <div className={styles.price}>${offer.price}</div>
              <div className={styles.deliveryDate}>
                {offer.deliveryDate} {offer.deliveryDate === 1 ? "minute" : "minutes"}
              </div>
            </div>
          </div>
        </div>
        <p className={styles.author}>
          {offer.userId.slice(0, 4) + "..." + offer.userId.slice(-4)}
        </p>
        <div className={styles.rating}>
          <FaStar className="orangeText" /> {5}
        </div>
      </Link>
    </div>
  );
}
