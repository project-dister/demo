"use client";
import Image from "next/image";
import styles from "./Messages.module.scss";
import { ethers } from "ethers";

import USDC_ABI from "../../../ABIs/USDC_ABI.json";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/initFirebase";
import { useMarketplace } from "@/context/MarketplaceContext";

const usdcAddress = "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23";
const marketplaceAddress = "0x592eC349eC58388451eA08847f96413C94974380";

interface EthereumWindow extends Window {
  ethereum: {
    request: (options: any) => Promise<any>;
  };
}

declare const window: EthereumWindow;

type MessageProps = {
  message: {
    sender: string;
    text: string;
    offer?: {
      title: string;
      price: number;
      deliveryDate: number;
      image: string;
      smartContractOrderId?: string; // or the type that fits your needs
      orderId?: string; // or the type that fits your needs
      status?: string;
    };
  };
  self: string | undefined;
  users:
    | {
        address: string;
        name: string;
        profilePicture: string;
      }[]
    | undefined;
  chatId: string;
  messageId: string;
};

export default function Message({
  message,
  self,
  users,
  chatId,
  messageId,
}: MessageProps) {
  const senderData = users?.find((user) => user.address === message.sender);
  const marketplace = useMarketplace(); // Use Marketplace context
  const [usdc, setUsdc] = useState<ethers.Contract | null>(null);
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum as any);
          const signer = await provider.getSigner();
          const usdc = new ethers.Contract(usdcAddress, USDC_ABI, signer);
          setUsdc(usdc);
          if (message.offer?.status === "accepted") {
            setIsOfferAccepted(true);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    init();
  }, []);

  const handleAccept = async () => {
    if (message.offer) {
      try {
        if (usdc && marketplace) {
          const amountToApprove = ethers.parseUnits(
            message.offer.price.toString(),
            6
          );

          // Step 1: Approve the USDC
          const approveTx = await usdc.approve(
            marketplaceAddress,
            amountToApprove
          );
          await approveTx.wait();

          // Step 2: Accept the order
          const acceptOrderTx = await marketplace.acceptOrder(
            message.offer.smartContractOrderId
          );
          await acceptOrderTx.wait();

          // Step 3: Update the status of the order and the offer in Firestore
          await updateDoc(doc(db, `orders/${message.offer.orderId}`), {
            status: "accepted",
          });

          await updateDoc(doc(db, `chats/${chatId}/messages/${messageId}`), {
            "offer.status": "accepted", // assuming messageId is the id of the current message
          });

          setIsOfferAccepted(true);


        } else {
          throw new Error("USDC or Marketplace contracts are not initialized");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isOfferMessage = message.offer !== undefined;

  return (
    <div
      className={`${styles.message} ${
        message.sender === self ? styles.self : styles.other
      }`}
    >
      <Image
        src={senderData?.profilePicture || "/blank.webp"}
        alt="Profile picture"
        width={40}
        height={40}
        className={`${styles.avatar} w-10 h-10 mr-3`}
      />
      {isOfferMessage ? (
        <div className={`${styles.offerMessageBox} cardBg`}>
          <div className={styles.offerImageContainer}>
            <Image
              src={message.offer?.image || "/blank.webp"}
              alt="Offer image"
              width={100}
              height={100}
              className={`${styles.offerImage}`}
            />
          </div>
          <div className={styles.offerDetails}>
            <div className={styles.offerTitle}>
              {message.offer?.title.slice(0, 35) + "..."}
            </div>
            <div className={styles.offerPriceAndDelivery}>
              {message.offer?.price} USD in {message.offer?.deliveryDate} minute(s)
            </div>
            {message.sender !== self &&
              (isOfferAccepted ? (
                <div className={styles.offerAccepted}>Offer accepted</div>
              ) : (
                <div className={styles.offerButtons}>
                  <button
                    className={styles.acceptButton}
                    onClick={handleAccept}
                  >
                    Accept
                  </button>
                  {/* <button className={styles.rejectButton}>Reject</button> */}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className={styles.messageBox}>{message.text}</div>
      )}
    </div>
  );
}
