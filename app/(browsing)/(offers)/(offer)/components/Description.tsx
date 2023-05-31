import InfoCards from "./InfoCards";
import styles from "./des.module.scss";

export default function Description({
  title,
  description,
  price,
  deliveryDate,
}: {
  title: string;
  description: string;
  price: string;
  deliveryDate: string;
}) {
  return (
    <div className={styles.description}>
      <h1 className={styles.offerTitle}>{title}</h1>
      <InfoCards
        price={Number(price)}
        deliveryDate={Number(deliveryDate)}
        ratings={4.6}
        quantity={423}
      />

      <h2 className="text-2xl font-bold mt-10 mb-6">Description</h2>

      <p className={styles.offerDescription}>{description}</p>
    </div>
  );
}
