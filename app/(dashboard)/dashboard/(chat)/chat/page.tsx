"use client";
import React, { useState } from "react";
import styles from "./ChatApp.module.scss";
import Messages from "./components/Messages";
import Sidebar from "./components/Sidebar";

const ChatApp: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // This function can be called with the selected chat ID when a chat is clicked in the sidebar
  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className={`${styles.chatAppContainer}`}>
      <div className={`${styles.chatApp} flex flex-col lg:flex-row gap-4`}>
        <Sidebar onChatSelect={handleChatSelect} />
        {selectedChatId && <Messages chatId={selectedChatId} />}
      </div>
    </div>
  );
};

export default ChatApp;
