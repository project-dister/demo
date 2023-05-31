"use client";
import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/initFirebase";

import PriceBox from "../common/PriceBox";
import styles from "./Completed.module.scss";
import StatusBox from "../common/StatusBox";
import { useMarketplace } from "@/context/MarketplaceContext";
import { toast } from "react-hot-toast";

interface Props {
  deadline: {
    days: number;
    hours: number;
    minutes: number;
  };
  orderDate: string;
  status: string;
  price: number;
  order: Order;
  orderId: string;
}

export default function Completed({
  deadline,
  orderDate,
  status,
  price,
  order,
  orderId,
}: Props) {
  const marketplace = useMarketplace();

  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const autoComplete = async () => {
    const autoCompletePromise = new Promise(async (resolve, reject) => {
      try {
        const tx = await (marketplace as any).autoComplete(
          order.smartContractOrderId
        );
        await tx.wait();

        // Update the order in Firebase
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status: "autoCompleted" });

        resolve("Order auto-completed successfully");
      } catch (err) {
        console.error(err);
        reject("Error in auto-completion");
      }
    });

    toast.promise(autoCompletePromise, {
      loading: "Processing auto-completion...",
      success: "Successffully auto-completed",
      error: "Failed to auto-complete",
    });
  };

  return (
    <div className={styles.completed}>
      <div className={styles.topSection}>
        <div className="text-left">
          <StatusBox status={status} date={orderDate} />
        </div>
        <div className="text-right ml-2">
          <PriceBox price={price} />
        </div>
      </div>
      {status == "delivered" && order.offerDownloadUrl ? (
        <div>
          <p className="mt-3">
            You've successfully delivered the order, the buyer has 3 minutes to
            review it
          </p>
        </div>
      ) : (
        <div>
          <p className="mt-3">
            {`Congratulations, your order is done! You've earned $ ${price}`}
          </p>
        </div>
      )}

      <button
        className="flex items-center justify-center py-2 px-4 my-4 w-full Completed"
        onClick={autoComplete}
      >
        Request funds
      </button>
    </div>
  );
}
