"use client";
import { FaPlay } from "react-icons/fa";
import styles from "./TutorialCard.module.scss";

import { useState } from "react";
import YouTubePopup from "@/app/components/YouTubePopup";

export default function TutorialCard() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
  };
  return (
    <>
      <div className="md:col-span-1">
        <div className={`${styles.tutorialCard} cardBg`}>
          <div className={styles.tutorialTitle}>How to buy this offer</div>
          <div className={styles.tutorialBtn} onClick={handleVideoOpen}>
            <FaPlay className={styles.playIcon} /> Tutorial Video
          </div>
        </div>
      </div>
      <YouTubePopup
        videoId="r0aGSeVlFSU"
        isOpen={isVideoOpen}
        onClose={handleVideoClose}
      />
    </>
  );
}
