// Footer.js
import Link from "next/link";
import styles from "./Footer.module.scss";
import { FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className={`${styles.footerDistributed} lightWhiteText p-12 shadow-md`}
    >
      <div className={`${styles.footerRight} flex justify-end space-x-4`}>
        <Link href="https://twitter.com/projectDister" target="_blank">
          <div className="w-10 h-10 rounded-md flex items-center justify-center hover:scale-110 transition-transform">
            <FaTwitter />
          </div>
        </Link>
        <Link href="https://github.com/project-dister" target="_blank">
          <div className="w-10 h-10 rounded-md flex items-center justify-center hover:scale-110 transition-transform">
            <FaGithub />
          </div>
        </Link>
      </div>

      <div className={styles.footerLeft}>
        <p className={`${styles.footerLinks} text-lg font-bold`}>
          <Link href="/" className="hover:underline mr-2">
            Home
          </Link>

          <Link href="/" className="hover:underline mr-2">
            Fees
          </Link>

          <Link href="/" className="hover:underline mr-2">
            Terms of Service
          </Link>

          <Link href="/" className="hover:underline mr-2">
            Roadmap
          </Link>
        </p>

        <p className="text-gray-500">Dister.org &copy; 2023</p>
      </div>
    </footer>
  );
}
