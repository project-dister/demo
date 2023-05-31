import getUser from "@/lib/getUser";

import { Suspense } from "react";

import styles from "./user.module.scss";
import UserCardLoading from "./components/UserCardLoading";
import UserCard from "./components/UserCard";
import OfferCardLoading from "@/app/(browsing)/(offers)/components/OfferCardLoading";
import OfferCard from "@/app/(browsing)/(offers)/components/OfferCard";

export async function generateMetadata({
  params,
}: {
  params: { address: string };
}) {
  const { address } = params;
  const userData = await getUser(address);

  if (userData.name && userData.description) {
    const title = `${userData.name} | Dister.org`;
    const description = userData.description;

    return {
      title: title,
      description: description,
    };
  } else {
    const title = `Anonymus user at Dister.org`;
    const description =
      "Dister is a decentralized freelance marketplace built on the Ethereum blockchain";

    return {
      title: title,
      description: description,
    };
  }
}

export default async function UserPage({
  params,
}: {
  params: { address: string };
}) {
  const { address } = params;

  const userData = await getUser(address);
  const offers = userData.offers;

  return (
    <div className={styles.user}>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <Suspense fallback={<UserCardLoading />}>
          {/* @ts-expect-error Server Component */}
          <UserCard promise={userData} />
        </Suspense>
        <div className="w-full lg:w-1/2">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6  lg:grid-cols-1 xl:grid-cols-2">
              {offers && offers.length > 0 ? (
                offers.map(
                  ({
                    offerId,
                    category,
                  }: {
                    offerId: string;
                    category: string;
                  }) => (
                    <Suspense fallback={<OfferCardLoading />} key={offerId}>
                      {/* @ts-expect-error Serve Component */}
                      <OfferCard
                        offerId={offerId}
                        category={category}
                        key={offerId}
                      />
                    </Suspense>
                  )
                )
              ) : (
                <div className="bg-black p-6 rounded-xl">
                  <h1 className="text-white text-xl">
                    There isn't any offer in this category yet
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
