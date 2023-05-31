import { FaWalking, FaCheck, FaBan, FaParachuteBox } from "react-icons/fa";
import styles from "./StatusBox.module.scss";

type StatusBoxProps = {
  status: string;
  date: string;
};

export default function StatusBox({ status, date }: StatusBoxProps) {


  if (status === "accepted" || status === "disputed") {
    return (
      <div className={styles.statusBox} style={{ backgroundColor: "#FFA421" }}>
        <FaWalking className={`${styles.icon} mr-2`} />
        <span className={styles.date}>{date}</span>
      </div>
    );
  }
  if (status === "completed" || status === "delivered") {
    return (
      <div className={styles.statusBox} style={{ backgroundColor: "#67B580" }}>
        {status == "delivered" ? (
          <FaParachuteBox className={`${styles.icon} mr-2`} />
        ) : (
          <FaCheck className={`${styles.icon} mr-2`} />
        )}
        <span className={styles.date}>{date}</span>
      </div>
    );
  }
  if (status === "autoRefunded" || status === "autoCompleted") {
    return (
      <div className={styles.statusBox} style={{ backgroundColor: "#f44336" }}>
        <FaBan className={`${styles.icon} mr-2`} />
        <span className={styles.date}>{date}</span>
      </div>
    );
  }
  return (
    <div>
      <p>no status</p>
    </div>
  );
}
