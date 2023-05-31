"use client";
import { useState } from "react";
import styles from "./gallery.module.scss";
import Image from "next/image";

export default function Gallery({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(0);

  const handleClick = (index: any) => {
    setActiveImage(index);
  };

  return (
    <div className={styles.imageGallery}>
      <div className={styles.activeImages}>
        {images.map(
          (image, index) =>
            index === activeImage && (
              <Image
                key={index}
                src={image}
                alt={`thumbnail ${index}`}
                width={1000}
                height={1000}
                className={styles.image + " " + styles.activeImage}
              />
            )
        )}
      </div>
      <div className={styles.inactiveImages}>
        {images.map(
          (image, index) =>
            index !== activeImage && (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={styles.image + " " + styles.inactiveImage}
              >
                <Image
                  key={index}
                  src={image}
                  alt={`thumbnail ${index}`}
                  className="cover"
                  width={500}
                  height={500}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
