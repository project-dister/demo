import { Suspense } from "react";
import OffersLoading from "@/app/(browsing)/(offers)/OffersLoading";
import Offers from "@/app/(browsing)/(offers)/Offers";

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  return (
    <Suspense fallback={<OffersLoading />}>
      {/* @ts-expect-error Serve Component */}
      <Offers category={category} />
    </Suspense>
  );
}
