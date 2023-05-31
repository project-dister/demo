"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./BigCard.module.scss";

import SoldCancelled from "../seller/Cancelled";
import SoldCompleted from "../seller/Completed";
import SoldPending from "../seller/Pending";

import BoughtCancelled from "../buyer/Cancelled";
import BoughtCompleted from "../buyer/Completed";
import BoughtPending from "../buyer/Pending";
import UserInfo from "./UserInfo";
import useFirebaseUser from "@/lib/useFirebaseUser";
import { RxArrowRight } from "react-icons/rx";
import formatOrderDate from "@/helpers/formatOrderDate";

interface BigCardProps {
  order: any;
  onClose: () => void;
}

export default function BigCard({ order, onClose }: BigCardProps) {
  const [closing, setClosing] = useState(false);

  const { user: currentUser } = useFirebaseUser();

  let oppositeUserAddress;
  if (currentUser && currentUser.uid === order.sellerAddress) {
    oppositeUserAddress = order.buyerAddress;
  } else {
    oppositeUserAddress = order.sellerAddress;
  }

  const calculateDeadline = () => {
    const orderDate = new Date(order.timestamp.seconds * 1000);
    const deliveryDate = new Date(
      orderDate.getTime() + order.deliveryDate * 60000
    );

    const diff = deliveryDate.getTime() - Date.now();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return { minutes, hours, days };
  };

  const deadline = calculateDeadline();

  const orderDate = formatOrderDate(order.timestamp, order.deliveryDate);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const isSeller = currentUser && currentUser.uid === order.sellerAddress;
  const isOrderPending = ["accepted", "disputed"].includes(order.status);
  const isOrderCompleted = ["completed", "delivered"].includes(order.status);

  return (
    <div className={styles.bigCardWrapper}>
      <div
        className={`${styles.bigCard} cardBg ${closing ? styles.closing : ""}`}
      >
        <div className="flex items-center justify-between w-full mb-4">
          <button
            onClick={handleClose}
            className={`${styles.closeButton} font-light flex items-center justify-center`}
          >
            <RxArrowRight className="text-xl" />
          </button>
        </div>
        <Image
          src={order.offerData.images[0]}
          alt={order.offerData.title || "thumbnail"}
          width={300}
          height={300}
          className={styles.thumbnail}
        />
        <UserInfo user={order.buyerData || order.sellerData} />

        {isSeller ? (
          isOrderCompleted ? (
            <SoldCompleted
              deadline={deadline}
              orderDate={orderDate}
              status={order.status}
              price={order.price}
              order={order}
              orderId={order.orderId}
            />
          ) : isOrderPending ? (
            <SoldPending
              deadline={deadline}
              orderDate={orderDate}
              status={order.status}
              price={order.price}
              order={order}
              orderId={order.orderId}
            />
          ) : (
            <SoldCancelled
              orderDate={orderDate}
              status={order.status}
              price={order.price}
            />
          )
        ) : isOrderCompleted ? (
          <BoughtCompleted
            deadline={deadline}
            orderDate={orderDate}
            status={order.status}
            price={order.price}
            order={order}
            orderId={order.orderId}
          />
        ) : isOrderPending ? (
          <BoughtPending
            deadline={deadline}
            orderDate={orderDate}
            status={order.status}
            price={order.price}
            order={order}
            orderId={order.orderId}
          />
        ) : (
          <BoughtCancelled
            orderDate={orderDate}
            status={order.status}
            price={order.price}
          />
        )}
      </div>
    </div>
  );
}
