import styles from "../user.module.scss";

export default function UserCardLoading() {
  return (
    <div className={`${styles.userCard} w-full lg:w-1/2  mb-4 lg:mb-0 cardBg`}>
      <div className="w-full h-full bg-black animate-pulse"></div>
    </div>
  );
}
