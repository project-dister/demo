import React from "react";
import { BsClock } from "react-icons/bs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/initFirebase";

import PriceBox from "../common/PriceBox";
import CountdownTimer from "../common/CountdownTimer";

import StatusBox from "../common/StatusBox";
import { useMarketplace } from "@/context/MarketplaceContext";
import { toast } from "react-hot-toast";

interface PendingProps {
  deadline: {
    days: number;
    hours: number;
    minutes: number;
  };
  orderDate: string;
  status: string;
  price: number;
  offerDownloadUrl?: string; // Map offerDownloadUrl to this prop
  order: Order; // Add the order
  orderId: string; // Add the orderId
}

const Pending: React.FC<PendingProps> = ({
  deadline,
  orderDate,
  status,
  price,
  order,
  orderId,
}) => {
  const marketplace = useMarketplace();

 
  const autoRefund = async () => {
    const autoRefundPromise = new Promise(async (resolve, reject) => {
      try {
        const tx = await (marketplace as any).autoRefund(
          order.smartContractOrderId
        );
        await tx.wait();

        // Update the order in Firebase
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status: "autoRefunded" });

        resolve("Order auto-refunded successfully");
      } catch (err) {

        reject("Error in auto-refund");
      }
    });

    toast.promise(
      autoRefundPromise,
      {
        loading: "Processing auto-refund...",
        success: "successfully auto-refunded",
        error: "failed to auto-refund"
      }
    );
  };

  return (
    <>
      <div className="flex justify-between w-full mt-5">
        <div className="flex flex-col gap-2 text-left mt-1">
          <StatusBox status={status} date={orderDate} />
          <PriceBox price={price} />
        </div>
        <div>
          {deadline.minutes < 0 ? (
            <button
              onClick={autoRefund}
              className="bg-white text-black rounded-md p-2"
            >
              Auto Refund
            </button>
          ) : (
            <div>
              <p className="flex items-center mb-1">
                <BsClock className="mr-1" /> Time left to deliver
              </p>
              <CountdownTimer
                minutes={deadline.minutes}
                hours={deadline.hours}
                days={deadline.days}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pending;
