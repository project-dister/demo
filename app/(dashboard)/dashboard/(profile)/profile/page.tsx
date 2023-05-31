"use client";

import ProfileBox from "./components/ProfileBox/ProfileBox";
import EditOffer from "./components/EditOffer/EditOffer";
import Offers from "./components/EditOffer/Offers";
import { useState, useEffect } from "react";

import useFirebaseUser from "@/lib/useFirebaseUser";
import getUserOffers from "@/lib/getUserOffers";

export default function ResponsiveLayout() {
  const { user } = useFirebaseUser();
  // const [offers, setOffers] = useState<Offer[]>([]);

  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const fetchUserOffers = async () => {
    if (user) {
      const userOffers = await getUserOffers(user.uid);
      setOffers(userOffers);
    }
  };

  useEffect(() => {
    fetchUserOffers();
  }, [user]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/3 p-2">
          <div className="min-h-48">
            <ProfileBox />
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-2">
          {/* <EditOffer onNewOfferCreated={fetchUserOffers} /> */}
          <EditOffer
            onNewOfferCreated={fetchUserOffers}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
        </div>
      </div>
      {/* <Offers offers={offers} /> */}
      <Offers offers={offers} onEditClick={setSelectedOffer} />
    </>
  );
}
