"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "./sidebar.module.scss";

import { db } from "@/lib/initFirebase";
import useFirebaseUser from "@/lib/useFirebaseUser";
import SidebarItem from "./SidebarItem";

type Chat = {
  id: string;
  users: {
    address: string;
    name: string;
    profilePicture: string | null;
  }[];
};

type SidebarProps = {
  onChatSelect: (chatId: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  const { user } = useFirebaseUser();
  const currentUserAddress = user?.uid;
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (currentUserAddress) {
      fetchChats();
    }
  }, [currentUserAddress]);

  const fetchChats = async () => {
    const q = query(
      collection(db, "chats"),
      where("userAddresses", "array-contains", currentUserAddress)
    );
    const querySnapshot = await getDocs(q);

    let fetchedChats: Chat[] = [];
    querySnapshot.forEach((doc) => {
      fetchedChats.push({
        id: doc.id,
        ...doc.data(),
      } as Chat);
    });

    setChats(fetchedChats);
  };

  const getOtherUser = (chat: Chat) => {
    return chat.users.find((user) => user.address !== currentUserAddress);
  };

  const handleChatClick = (chatId: string) => {
    onChatSelect(chatId);
  };

  return (
    <div
      className={`${styles.sidebar} cardBg h-20 lg:h-full lg:w-96 overflow-x-scroll lg:overflow-x-hidden flex lg:flex-col whitespace-nowrap`}
    >
      {chats.map((chat) => {
        const otherUser = getOtherUser(chat);
        return (
          <SidebarItem
            key={chat.id}
            user={otherUser}
            onClick={() => handleChatClick(chat.id)}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
