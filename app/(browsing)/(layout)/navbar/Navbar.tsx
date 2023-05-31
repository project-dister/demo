import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

import styles from "./nav.module.scss";

export default function Navbar() {
  return (
    <nav className={`${styles.nav}`}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src={"/logos/dister-huge-beta.png"}
              width={195}
              height={45}
              alt="Dister Logo"
            />
          </Link>
        </div>
        <ConnectWallet />
      </div>
    </nav>
  );
}
