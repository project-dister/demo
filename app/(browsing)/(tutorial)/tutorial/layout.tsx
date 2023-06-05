import styles from "./tutorial.module.scss";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.tutorial}>{children}</div>;
}
