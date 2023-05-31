import InfoCard from "./InfoCard";
import styles from "./InfoCards.module.scss";

export default function InfoCards({
  price,
  deliveryDate,
  ratings,
  quantity,
}: {
  price: number;
  deliveryDate: number;
  ratings: number;
  quantity: number;
}) {
  const priceString = "$" + price;

  const deliveryString =
    deliveryDate > 1 ? deliveryDate + " minutes" : deliveryDate + " minute";

  const ratingsString = ratings.toString();

  return (
    <div className={styles.infoCards}>
      <p className="mb-4">Starting at</p>
      <div className="flex flex-row">
        <InfoCard title="Price" value={priceString} />
        <InfoCard title="Delivery" value={deliveryString} />
        <InfoCard title="Ratings" value={ratingsString} quantity={quantity} />
      </div>
    </div>
  );
}
