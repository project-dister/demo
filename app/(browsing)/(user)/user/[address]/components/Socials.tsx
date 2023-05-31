import styles from "../user.module.scss";
import {
  FaDribbble,
  FaGoogle,
  FaLinkedin,
  FaEthereum,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

export default function Socials() {
  return (
    <div className={`${styles.socials} flex flex-col space-y-4`}>
      <div className={styles.socialIcon}>
        <FaEthereum />
      </div>

      <div className={styles.socialIcon}>
        <FaTwitter />
      </div>

      <div className={styles.socialIcon}>
        <FaLinkedin />
      </div>

      <div className={styles.socialIcon}>
        <FaGoogle />
      </div>

      <div className={styles.socialIcon}>
        <FaDribbble />
      </div>

      <div className={styles.socialIcon}>
        <FaGithub />
        </div>
    </div>
  );
}
