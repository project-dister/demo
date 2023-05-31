import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/initFirebase";
import toKebabCase from "@/helpers/toKebabCase";

interface SendOfferProps {
  selectedOffer: any;
  marketplace: ethers.Contract | null;
  orderPrice: number | null;
  deliveryDate: number | null;
  buyerAddress: string | null;
  chatId: string;
  user: any;
}

async function sendOffer({
  selectedOffer,
  marketplace,
  orderPrice,
  deliveryDate,
  buyerAddress,
  chatId,
  user,
}: SendOfferProps) {
  if (
    !selectedOffer ||
    !marketplace ||
    orderPrice === null ||
    deliveryDate === null ||
    !buyerAddress
  )
    return;

  const sendOfferPromise = new Promise(async (resolve, reject) => {
    try {
      const tx = await marketplace.createOrder(
        buyerAddress,
        orderPrice,
        deliveryDate
      );
      const receipt = await tx.wait();

      const rawLogs = receipt.logs;
      const events = rawLogs.map((log: any) =>
        marketplace.interface.parseLog(log)
      );

      const event = events.find((e: any) => e.name === "OrderCreated");

      if (!event || !event.args) {
        throw new Error("Transaction receipt does not have OrderCreated event");
      }

      const smartContractOrderId = event.args.orderId.toString();

      const newOrderRef = await addDoc(collection(db, `orders`), {
        offerId: selectedOffer.offerId,
        category: toKebabCase(selectedOffer.category),
        buyerAddress: buyerAddress,
        sellerAddress: user.uid,
        price: orderPrice,
        deliveryDate: deliveryDate,
        smartContractOrderId,
        status: "created",
        timestamp: serverTimestamp(),
      });

      await addDoc(collection(db, `chats/${chatId}/messages`), {
        offer: {
          offerId: selectedOffer.offerId,
          smartContractOrderId,
          title: selectedOffer.title,
          price: orderPrice,
          deliveryDate: deliveryDate,
          image: selectedOffer.images[0],
          orderId: newOrderRef.id,
          category: selectedOffer.category,
        },
        sender: user.uid,
        timestamp: serverTimestamp(),
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      resolve("Order successfully created");
    } catch (err) {
      console.error(err);
      reject("Error creating order");
    }
  });

  toast.promise(sendOfferPromise, {
    loading: "Creating offer...",
    success: " Offer created successfully!",
    error: " Could not create offer.",
  });
}

export default sendOffer;
