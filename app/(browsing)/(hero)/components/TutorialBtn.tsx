import Link from "next/link";
import styles from "./TutorialBtn.module.scss";
import { FaPlay } from "react-icons/fa";

export default function TutorialBtn() {
  return (
    <Link href="/tutorial">
      <button className={styles.actionButton}>
        <FaPlay className={styles.actionButtonIcon} />
        Tutorials
      </button>
    </Link>
  );
}
