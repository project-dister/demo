import { Suspense } from "react";

import Gallery from "../../../components/Gallery";
import styles from "./offer.module.scss";
import Description from "../../../components/Description";
import UserCard from "../../../components/UserCard";
import Testimonials from "../../../components/Testimonials";
import getOffer from "@/lib/getOffer";
import getUser from "@/lib/getUser";

type Params = {
  params: {
    category: string;
    offerId: string;
  };
};

export default async function OfferPage({
  params: { offerId, category },
}: Params) {
  const offerData = await getOffer(category, offerId);
  const userData: Promise<User> = getUser(offerData.userId);

  return (
    <>
      <div className={styles.offerPage}>
        <Gallery images={offerData.images} />
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 ml-2">
              <Description
                title={offerData.title}
                description={offerData.description}
                price={offerData.price}
                deliveryDate={offerData.deliveryDate}
              />
            </div>
            <div className="col-start-1 lg:col-start-auto lg:col-span-1 mr-2 mt-6 relative">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4 animate-pulse bg-black">
                    <div className="md:col-span-1 lg:row-span-2 w-full"></div>
                  </div>
                }
              >
                {/* @ts-expect-error Server Component */}
                <UserCard promise={userData} />
              </Suspense>
            </div>
          </div>
          <Testimonials />
        </div>
      </div>
    </>
  );
}
