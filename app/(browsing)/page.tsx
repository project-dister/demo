import { Suspense } from "react";
import IconList from "./(categories)/category/[category]/components/IconList";
import Hero from "./(hero)/Hero";
import OffersLoading from "./(offers)/OffersLoading";
import styles from "./(categories)/category/[category]/components/categories.module.scss";
import Offers from "./(offers)/Offers";

export default () => {
  return (
    <>
      <main>
        <Hero />
        <section className={styles.categories}>
          <h2 className={styles.sectionTitle}>
            Shop by
            <span className="orangeText"> Categories</span>
          </h2>
          <IconList 
            category="blockchain"
          />
          <Suspense fallback={<OffersLoading />}>
            {/* @ts-expect-error Serve Component */}
            <Offers category={"blockchain"} />
          </Suspense>
        </section>
      </main>
    </>
  );
};
