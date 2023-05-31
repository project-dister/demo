"use client";
// Completed.tsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Completed.module.scss";
import "tailwindcss/tailwind.css";

import { CiStar } from "react-icons/ci";

import DownloadBtn from "../common/DownloadBtn";
import PriceBox from "../common/PriceBox";
import { HiCheck, HiXMark } from "react-icons/hi2";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/initFirebase";

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
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const marketplace = useMarketplace();

  const completeOrder = async () => {
    const completeOrderPromise = new Promise(async (resolve, reject) => {
      try {
        const tx = await (marketplace as any).completeOrder(
          order.smartContractOrderId
        );
        await tx.wait();

        // Update the order in Firebase
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status: "completed" });

        resolve("Order completed successfully");
      } catch (err) {
        console.error(err);
        reject("Error completing order");
      }
    });

    toast.promise(completeOrderPromise, {
      loading: "Completing order...",
      success: "Completed order...",
      error: "Failed to complete order...",
    });
  };

  const initiateDispute = async () => {
    const initiateDisputePromise = new Promise(async (resolve, reject) => {
      try {
        const tx = await (marketplace as any).initiateDispute(
          order.smartContractOrderId
        );
        await tx.wait();
        // Update the order status in Firebase
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status: "disputeInitiated" });

        resolve("Dispute initiated successfully");
      } catch (err) {
        console.error(err);
        reject("Error initiating dispute");
      }
    });

    toast.promise(initiateDisputePromise, {
      loading: "Initiating dispute...",
      success: "Dispute initiaded...",
      error: "Failed to initiate dispute...",
    });
  };

  const onStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const onStarHover = (starIndex: number) => {
    setHover(starIndex);
  };

  const onStarLeave = () => {
    setHover(0);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((starIndex) => {
      return (
        <span
          key={starIndex}
          className={`${styles.star} text-2xl`}
          onClick={() => onStarClick(starIndex)}
          onMouseEnter={() => onStarHover(starIndex)}
          onMouseLeave={onStarLeave}
        >
          {rating >= starIndex || hover >= starIndex ? <FaStar /> : <CiStar />}
        </span>
      );
    });
  };

  return (
    <div className={styles.completed}>
      {showPopup && (
        <div className={`${styles.confirmation} Cancelled`}>
          <HiXMark onClick={() => setShowPopup(false)} />
          <p>
            Only create a dispute if the seller did not delivered as aggreed
            before creating the order
          </p>
          <button onClick={initiateDispute}>create dispute</button>
        </div>
      )}
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
            Your order is delivered, you have 3 minutes to download and review
            the files
          </p>
          <DownloadBtn offerDownloadUrl={order.offerDownloadUrl} />
          <button
            className="flex items-center justify-center py-2 px-4 my-4 w-full Completed"
            onClick={completeOrder}
          >
            <HiCheck className="mr-2" /> Accept Delivery
          </button>
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center justify-center py-2 px-4 my-4 w-full Cancelled"
          >
            <HiXMark className="mr-2" /> Decline Delivery
          </button>
        </div>
      ) : (
        <div className={styles.reviewSection}>
          <div className={styles.textareaWrapper}>
            <label htmlFor="review">
              Write a review {135 - review.length} character(s) left:
            </label>
            <textarea
              value={review}
              placeholder="Write a review..."
              onChange={(e) =>
                setReview(
                  e.target.value
                    .replace(/[^a-zA-Z0-9\s-.'!?:,]/g, "")
                    .substr(0, 135)
                )
              }
              name="review"
              maxLength={135}
              rows={3}
              className="border mt-2 p-2 w-full"
            ></textarea>
          </div>
          <div className={`${styles.bottomRow} mt-2`}>
            <div className={`${styles.stars} flex`}>{renderStars()}</div>
            <button className={`${styles.submit} flex py-2 px-4`}>
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
