import styles from "./About.module.scss";
export default function About({ description }: { description: string }) {
  return (
    <div className={styles.bottomRow}>
      <div className={styles.aboutMe}>
        <h2 className={styles.sectionTitle}>About me</h2>
        <p className={styles.sectionText}>{description}</p>
      </div>
      <div className={styles.contacBtn}>Send a message</div>
    </div>
  );
}
