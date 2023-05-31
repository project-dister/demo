import { Timestamp } from "firebase-admin/firestore";

export default function formatOrderDate(timestamp: Timestamp, deliveryDate: number): string {
    let orderDate = timestamp.toDate();
    orderDate.setDate(orderDate.getDate() + deliveryDate);
  
    try {
      let formattedDate =
        orderDate.toLocaleString("default", { month: "short" }) +
        " " +
        orderDate.getDate();
      return formattedDate;
    } catch (error) {
      console.error("Error formatting the order date:", error);
      return "⏰";
    }
  }
  