"use client";

import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

import { IoPlayOutline } from "react-icons/io5";

import PriceBox from "../common/PriceBox";
import StatusBox from "../common/StatusBox";

export default function Cancelled({ orderDate, status, price }: BigCardProps) {
  return (
    <>
      <div className="flex items-center gap-2 w-full mt-4">
        <StatusBox status={status} date={orderDate} />
        <PriceBox price={price} />
        <span className="flex items-center my-4 bg-red-500 text-md lightWhiteText px-2 py-1 rounded-lg">
          <FiAlertTriangle className="mr-2" />
          alert!
        </span>
      </div>
      <h1 className="text-xl mt-2">
        The order was cancelled 😵, please avoid these situations in the future!
        🦍
      </h1>
      <p className="text-sm mt-6">
        After 3 cancelled orders, your account will be banned 🥊 from the
        platform!!
      </p>
      <button className="flex items-center justify-center w-full mt-6 bg-red-500 text-lg lightWhiteText px-2 py-1 rounded-lg font-light">
        <IoPlayOutline className="mr-1" />
        Play video
      </button>
    </>
  );
}
