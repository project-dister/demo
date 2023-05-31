"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import styles from "./Messages.module.scss";
import MessageInput from "./MessageInput";
import Message from "./Message";
import { db } from "@/lib/initFirebase";
import useFirebaseUser from "@/lib/useFirebaseUser";

export default function Messages({ chatId }: { chatId: string }) {
  const { user } = useFirebaseUser();

  const [chat, setChat] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    if (chatId) {
      const chatRef = doc(db, `chats/${chatId}`);
      const unsubscribeChat = onSnapshot(chatRef, (doc) => {
        if (doc.exists()) {
          setChat(doc.data() as ChatData);
        } else {
          console.error("Chat does not exist");
        }
      });

      const messagesRef = collection(chatRef, "messages");
      const q = query(messagesRef, orderBy("timestamp"));
      const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
        let fetchedMessages: MessageData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({
            messageId: doc.id,
            ...doc.data(),
          } as MessageData);
        });
        setMessages(fetchedMessages);
      });

      return () => {
        unsubscribeChat();
        unsubscribeMessages();
      };
    }
  }, [chatId]);

  return (
    <div
      className={`${styles.chatMessagesContainer} h-2/3 md:h-full flex-grow cardBg`}
    >
      <div className={styles.chatMessages}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              messageId={message.messageId}
              self={user?.uid}
              users={chat?.users}
              chatId={chatId}
            />
          ))
        ) : (
          <p className={styles.emptyMessage}>Start messaging</p>
        )}
      </div>
      <MessageInput chatId={chatId} user={user} chat={chat} />
    </div>
  );
}
