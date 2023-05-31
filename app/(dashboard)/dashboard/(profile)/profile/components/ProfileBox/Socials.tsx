import styles from "./Socials.module.scss";

import {
  FaDribbble,
  FaGithub,
  FaEthereum,
  FaGoogle,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import Link from "next/link";

interface SocialsProps {
  user: string;
}

export default function Socials({ user }: SocialsProps) {
  return (
    <div className={`${styles.socials}`}>
      <Link
        href={`https://mumbai.polygonscan.com/address/${user}`}
        target="_blank"
      >
        <FaEthereum className={`${styles.social}`} />
      </Link>
      <FaTwitter className={`${styles.social}`} />
      <FaLinkedin className={`${styles.social}`} />
      <FaGoogle className={`${styles.social}`} />
      <FaDribbble className={`${styles.social}`} />
      <FaGithub className={`${styles.social}`} />
    </div>
  );
}
