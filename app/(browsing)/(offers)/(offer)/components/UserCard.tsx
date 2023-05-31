import Image from "next/image";
import styles from "./UserCard.module.scss";
import { FaStar } from "react-icons/fa";
import TutorialCard from "./TutorialCard";
import Link from "next/link";
import getLocalTime from "@/lib/getLocalTime";
import ContactBtn from "./ContactBtn";

type Props = {
  promise: Promise<User>;
};

export default async function userCard({ promise }: Props) {
  const seller = await promise;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4 ">
        <div className="md:col-span-1 lg:row-span-2">
          <div className={`${styles.sellerCard} cardBg`}>
            <div className={styles.infoCard}>
              <div className={styles.profilePic}>
                <Image
                  src={
                    seller.profilePicture
                      ? seller.profilePicture
                      : "/seller.svg"
                  }
                  width={100}
                  height={100}
                  alt={
                    seller.name
                      ? seller.name
                      : seller.address + " profile picture"
                  }
                />
              </div>
              <div className={`${styles.info}`}>
                <h3 className={styles.name}>
                  {seller.name
                    ? seller.name
                    : seller.address.slice(0, 4) +
                      "..." +
                      seller.address.slice(-4)}
                </h3>
                <p className={styles.occupation}>
                  {seller.occupation ? seller.occupation : "No occupation 🤷‍♂️"}
                </p>
                <div className={styles.rating}>
                  <FaStar className={`${styles.ratingIcon} orangeText`} /> 0.0
                  (0)
                </div>
              </div>
              <div className={styles.time}>
                Local time:{" "}
                {seller.timeZone ? (
                  <span>{getLocalTime(seller.timeZone)}</span>
                ) : (
                  <span>🤷‍♂️</span>
                )}
              </div>
            </div>

            <div className={styles.seeProfile}>
              <Link href={`/user/${seller.address}`}>See full profile</Link>
            </div>

            <ContactBtn otherUserAddress={seller.address} />
          </div>
        </div>
        <TutorialCard />
      </div>
    </>
  );
}
