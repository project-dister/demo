"use client";
// Orders.tsx
import React, { useState } from "react";
import Column from "./Column";
import Card from "./Card";
import BigCard from "./bigCard/BigCard";

const Orders = ({ orders }: { orders: any[] }) => {
  const [bigCardVisible, setBigCardVisible] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<any | null>(null);

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement>,
    data: any
  ) => {
    setSelectedCardData(data);
    setBigCardVisible(true);
  };

  const handleBigCardClose = () => {
    setBigCardVisible(false);
  };

  const completedOrders = orders.filter(
    (order) => order.status === "completed" || order.status === "delivered"
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "accepted" || order.status === "disputed"
  );
  const cancelledOrders = orders.filter(
    (order) =>
      order.status === "autoRefunded" || order.status === "autoCompleted"
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lightWhiteText min-h-screen">
        {bigCardVisible && selectedCardData && (
          <BigCard order={selectedCardData} onClose={handleBigCardClose} />
        )}

        {completedOrders.length > 0 && (
          <Column title="Completed" quant={completedOrders.length}>
            {completedOrders.map((order) => (
              <Card
                key={order.orderId}
                order={order}
                onClick={handleCardClick}
              />
            ))}
          </Column>
        )}

        {pendingOrders.length > 0 && (
          <Column title="Pending" quant={pendingOrders.length}>
            {pendingOrders.map((order) => (
              <Card
                key={order.orderId}
                order={order}
                onClick={handleCardClick}
              />
            ))}
          </Column>
        )}

        {cancelledOrders.length > 0 && (
          <Column title="Cancelled" quant={cancelledOrders.length}>
            {cancelledOrders.map((order) => (
              <Card
                key={order.orderId}
                order={order}
                onClick={handleCardClick}
              />
            ))}
          </Column>
        )}
      </div>
    </>
  );
};

export default Orders;
