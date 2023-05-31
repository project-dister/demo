import styles from "./OfferCard.module.scss";

export default function OfferCardLoading() {
  return (
    <div className={`${styles.card}`}>
      <div className="w-full h-full bg-black animate-pulse"></div>
    </div>
  );
}
