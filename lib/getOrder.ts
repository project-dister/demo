import { doc, getDoc } from "firebase/firestore";
import { db } from "./initFirebase";

export default async function getOrder(orderId: string) {
  const orderRef = doc(db, "orders", orderId);

  try {
    const orderSnapshot = await getDoc(orderRef);

    if (!orderSnapshot.exists()) {
      throw new Error("Order not found");
    }

    return {
      buyerAddress: orderSnapshot.data().buyerAddress,
      deliveryDate: orderSnapshot.data().deliveryDate,
      offerId: orderSnapshot.data().offerId,
      category: orderSnapshot.data().category,
      price: orderSnapshot.data().price,
      sellerAddress: orderSnapshot.data().sellerAddress,
      smartContractOrderId: orderSnapshot.data().smartContractOrderId,
      offerDownloadUrl: orderSnapshot.data()?.offerDownloadUrl,
      status: orderSnapshot.data().status,
      timestamp: orderSnapshot.data().timestamp.toDate(), // Assuming the timestamp in Firebase is stored as Firestore Timestamp
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
