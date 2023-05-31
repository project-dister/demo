import getLocalTime from "@/lib/getLocalTime";
import styles from "../user.module.scss";
export default function Time({ timeZone }: { timeZone: string }) {
  return (
    <div className={styles.localTime}>
      <span className={styles.labelText}>Local time:</span>
      {/* <p>10:00 AM</p> */}
      {timeZone? (
        <p>{getLocalTime(timeZone)}</p>
      ) : (
        <p>🤷‍♂️</p>
      )}
    </div>
  );
}
