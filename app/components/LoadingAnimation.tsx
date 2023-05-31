import React from "react";
import styles from "./LoadingAnimation.module.scss";

export default function LoadingAnimation() {
  return (
    <div className={styles.container}>
      <div className={styles.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
