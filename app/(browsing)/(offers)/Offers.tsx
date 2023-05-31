import styles from "./Offers.module.scss";
import { Suspense } from "react";
import OfferCardLoading from "./components/OfferCardLoading";
import OfferCard from "./components/OfferCard";
import getOfferIdsByCategory from "@/lib/getOffersByCategory";

export default async function Offers({ category }: { category: string }) {
  const offers = await getOfferIdsByCategory(category);

  return (
    <section className={styles.offersList}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}
      >
        {offers ? (
          offers.map(({ id, category }) => (
            <Suspense fallback={<OfferCardLoading />} key={id}>
              {/* @ts-expect-error Serve Component */}
              <OfferCard offerId={id} category={category} key={id} />
            </Suspense>
          ))
        ) : (
          <div className="bg-black p-6 rounded-xl">
            <h1 className="text-white text-xl">
              There isn't any offer in this category yet
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
