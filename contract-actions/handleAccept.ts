// contract-actions/handleAccept.ts

import { ethers } from "ethers";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/initFirebase";

interface HandleAcceptProps {
  usdc: any;
  marketplace: any;
  offer: any;
  chatId: string;
  messageId: string;
}

async function handleAccept({
  usdc,
  marketplace,
  offer,
  chatId,
  messageId,
}: HandleAcceptProps) {
  try {
    if (usdc && marketplace) {
      const amountToApprove = ethers.parseUnits(offer.price.toString(), 6);

      // Step 1: Approve the USDC
      const approveTx = await usdc.approve(
        marketplace.address,
        amountToApprove
      );
      await approveTx.wait();

      // Step 2: Accept the order
      const acceptOrderTx = await marketplace.acceptOrder(
        offer.smartContractOrderId
      );
      await acceptOrderTx.wait();

      // Step 3: Update the status of the order and the offer in Firestore
      await updateDoc(doc(db, `orders/${offer.orderId}`), {
        status: "accepted",
      });

      await updateDoc(doc(db, `chats/${chatId}/messages/${messageId}`), {
        "offer.status": "accepted",
      });
    } else {
      throw new Error("USDC or Marketplace contracts are not initialized");
    }
  } catch (err) {
    console.error(err);
  }
}

export default handleAccept;
