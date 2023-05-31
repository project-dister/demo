"use client";

import { useState, useEffect } from "react";
import styles from "./MessageInput.module.scss";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/initFirebase";
import getUserOffers from "@/lib/getUserOffers";
import { BsPlusLg, BsSend, BsXLg } from "react-icons/bs";

import sendOffer from "@/contract-actions/sendOffer";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function MessageInput({
  chatId,
  user,
  chat,
}: {
  chatId: string;
  user: any;
  chat: ChatData | null;
}) {
  const [input, setInput] = useState("");
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [orderPrice, setOrderPrice] = useState<number | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<number | null>(null);

  const marketplace = useMarketplace();
  const [buyerAddress, setBuyerAddress] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getUserOffers(user.uid).then(setOffers);
    }
  }, [user]);

  useEffect(() => {
    if (user && chat) {
      const otherUser = chat.users.find((u) => u.address !== user.uid);
      setBuyerAddress(otherUser?.address || null);
    }
  }, [user, chat]);

  useEffect(() => {
    if (selectedOffer) {
      setOrderPrice(selectedOffer.price);
      setDeliveryDate(selectedOffer.deliveryDate);
    }
  }, [selectedOffer]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (input && user && user.uid) {
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: input,
        sender: user.uid,
        timestamp: serverTimestamp(),
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
      setInput("");
    }
  };

  const handleSendOffer = async () => {
    await sendOffer({
      selectedOffer,
      marketplace,
      orderPrice,
      deliveryDate,
      buyerAddress,
      chatId,
      user,
    });
    setShowOfferPopup(false);
    setInput("");
  };
  return (
    <div className={styles.messageInput}>
      <input
        type="text"
        placeholder="Type your message..."
        className={`${styles.input} w-full p-2`}
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button
        className={`${styles.sendButton} orangeText rounded ml-2`}
        onClick={sendMessage}
      >
        <BsSend />
      </button>

      <button
        className={`${styles.sendOfferButton}  ml-2 flex items-center`}
        onClick={() => setShowOfferPopup(true)}
      >
        Offer <BsPlusLg />
      </button>

      {showOfferPopup && (
        <>
          <div className={styles.overlay}></div>
          <div className={`${styles.offerPopup} cardBg`}>
            {offers.map((offer) => (
              <div
                className={`${styles.offerCard} ${
                  selectedOffer?.offerId === offer.offerId
                    ? styles.selectedOffer
                    : ""
                }`}
                key={offer.offerId}
                onClick={() => setSelectedOffer(offer)}
              >
                <img
                  className={`${styles.thumbnail}`}
                  src={offer.images[0]}
                  alt="offer thumbnail"
                />
                <div className={`${styles.info}`}>
                  <span className={`${styles.title}`}>
                    {offer.title.substring(0, 25) + "..."}
                  </span>
                  <span className={`${styles.details}`}>
                    Price:
                    <span className="orangeText">
                      $
                      {selectedOffer?.offerId === offer.offerId
                        ? orderPrice
                        : offer.price}
                    </span>
                    , Delivery:{" "}
                    <span className="orangeText">
                      {selectedOffer?.offerId === offer.offerId
                        ? deliveryDate
                        : offer.deliveryDate}{" "}
                      minute(s)
                    </span>
                  </span>
                </div>
              </div>
            ))}

            <p className={`${styles.customTitle} text-center`}>
              Custom Price and Delivery Time
            </p>

            <div className={styles.bottomRow}>
              <input
                className={styles.customInputItem}
                type="number"
                placeholder="usd"
                value={orderPrice || ""}
                onChange={(e) => setOrderPrice(Number(e.target.value))}
              />

              <input
                className={styles.customInputItem}
                type="number"
                placeholder="minutes"
                value={deliveryDate || ""}
                onChange={(e) => setDeliveryDate(Number(e.target.value))}
              />
              <button
                onClick={handleSendOffer}
                className={`${styles.customInputItem} ${styles.sendButton}`}
              >
                Send
                <BsSend />
              </button>
            </div>
            <button
              onClick={() => setShowOfferPopup(false)}
              className={`${styles.closeButton} orangeText`}
            >
              <BsXLg />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
