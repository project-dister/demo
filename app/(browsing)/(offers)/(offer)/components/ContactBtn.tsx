"use client";

import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import styles from "./UserCard.module.scss";
import { db } from "@/lib/initFirebase";
import useFirebaseUser from "@/lib/useFirebaseUser";
import getUser from "@/lib/getUser";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Props = {
  otherUserAddress: string;
};

export default function ContactBtn({ otherUserAddress }: Props) {
  const { user } = useFirebaseUser();
  const router = useRouter();

  const currentUserAddress = user?.uid;

  const createNewChat = async () => {


    if (!currentUserAddress || !otherUserAddress) return;

    const q = query(
      collection(db, "chats"),
      where("userAddresses", "array-contains", currentUserAddress)
    );
    const querySnapshot = await getDocs(q);

    let chatExists = false;
    querySnapshot.forEach((doc) => {
      const userAddresses: string[] = doc.data().userAddresses;
      if (userAddresses.includes(otherUserAddress)) chatExists = true;
    });

    if (!chatExists && currentUserAddress !== otherUserAddress) {
      const currentUserData = await getUser(currentUserAddress);
      const otherUserData = await getUser(otherUserAddress);

      try {
        await addDoc(collection(db, "chats"), {
          users: [
            {
              address: currentUserAddress,
              name: currentUserData.name || "Anonymous",
              profilePicture: currentUserData.profilePicture || null,
            },
            {
              address: otherUserAddress,
              name: otherUserData.name || "Anonymous",
              profilePicture: otherUserData.profilePicture || null,
            },
          ],
          userAddresses: [currentUserAddress, otherUserAddress],
        });
        toast.success("Chat created successfully");
        router.push("/dashboard/chat");
      } catch (error) {
        toast.error("Error creating chat");
      }
    }
  };

  return (
    <div className={styles.sendMessage} onClick={createNewChat}>
      Send a message
    </div>
  );
}
