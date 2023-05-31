"use client";

import React, { useState } from "react";


import PriceBox from "../common/PriceBox";
import StatusBox from "../common/StatusBox";

export default function Cancelled({ orderDate, status, price }: BigCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
  };
  return (
    <>
      <div className="flex items-center gap-2 w-full mt-4">
        <StatusBox status={status} date={orderDate} />
        <PriceBox price={price} />
      </div>
      <h1 className="text-xl mt-2">
        The order was cancelled 😵, a full refund was issued! 🦍
      </h1>
    </>
  );
}
