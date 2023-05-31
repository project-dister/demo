import styles from "./InfoCards.module.scss";

interface InfoCardProps {
  title: string;
  value: string;
  quantity?: number;
}
export default function InfoCard({ title, value, quantity }: InfoCardProps) {
  return (
    <div className={styles.infoCard}>
      <p>{title}</p>
      <h2 className="font-bold">
        {value}
        {quantity && <span className="font-light"> ({quantity})</span>}
      </h2>
    </div>
  );
}
