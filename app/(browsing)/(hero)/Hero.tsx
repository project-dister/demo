import Image from "next/image";
import styles from "./hero.module.scss";

import TutorialBtn from "./components/TutorialBtn";

export default function Hero() {
  return (
    <main className={styles.hero}>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <h1
            className={`${styles.heroTitle} hero-title mb-4 text-center md:text-left`}
          >
            A Fair Freelancing Platform on{" "}
            <span className="orangeText">Web3</span>
          </h1>
          <h3
            className={`${styles.heroSubtitle} mb-4 text-center md:text-left`}
          >
            We aim to create a fair and transparent{" "}
            <span className="orangeText">freelancing platform</span> where
            everyone benefits.
          </h3>
          <div className="hidden md:block">
            <TutorialBtn />
          </div>

        </div>

        <div className="w-full md:w-1/2 text-center">
          <Image src={'/hero-illustration.png'} width={1000} height={1000} alt="Dister Hero Illustration" />
          <div className="md:hidden">
            <TutorialBtn />
          </div>
        </div>
      </div>
    </main>
  );
}
