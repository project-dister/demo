import styles from "./Offers.module.scss";
import OfferCardLoading from "./components/OfferCardLoading";

export default function OffersLoading() {
  return (
    <section className={styles.offersList}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <OfferCardLoading key={index} />
        ))}
      </div>
    </section>
  );
}
