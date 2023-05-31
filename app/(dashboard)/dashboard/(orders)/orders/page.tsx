"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import Orders from "./components/Orders";
import ToggleButton from "./components/ToggleButton";
import { db } from "@/lib/initFirebase";
import useFirebaseUser from "@/lib/useFirebaseUser";
import getOffer from "@/lib/getOffer";
import getUser from "@/lib/getUser"; // Import getUser function

export default function page() {
  const { user } = useFirebaseUser();
  const [soldOrders, setSoldOrders] = useState<any[]>([]);
  const [boughtOrders, setBoughtOrders] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const ordersRef = collection(db, "orders");
        const boughtOffersQuery = query(
          ordersRef,
          where("buyerAddress", "==", user.uid)
        );
        const soldOffersQuery = query(
          ordersRef,
          where("sellerAddress", "==", user.uid)
        );

        const boughtOffersSnapshot = await getDocs(boughtOffersQuery);
        const soldOffersSnapshot = await getDocs(soldOffersQuery);

        const fetchedBoughtOrders = await Promise.all(
          boughtOffersSnapshot.docs.map(async (doc) => {
            const offerData = await getOffer(
              doc.data().category,
              doc.data().offerId
            );
            const sellerData = await getUser(doc.data().sellerAddress);
            return { ...doc.data(), offerData, sellerData, orderId: doc.id };
          })
        );
        
        const fetchedSoldOrders = await Promise.all(
          soldOffersSnapshot.docs.map(async (doc) => {
            const offerData = await getOffer(
              doc.data().category,
              doc.data().offerId
            );
            const buyerData = await getUser(doc.data().buyerAddress);
            return { ...doc.data(), offerData, buyerData, orderId: doc.id };
          })
        );
        
        setBoughtOrders(fetchedBoughtOrders);
        setSoldOrders(fetchedSoldOrders);
      }
    };

    fetchOrders();
  }, [db, user]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between mb-7">
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold mb-3 lightWhiteText ">
            Track your orders
          </h1>
        </div>
        <div className="w-1/2">
          <div className="flex flex-row md:justify-end">
            <ToggleButton isChecked={isChecked} handleToggle={handleToggle} />
          </div>
        </div>
      </div>
      <Orders orders={isChecked ? soldOrders : boughtOrders} />
    </>
  );
}
