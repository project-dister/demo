import Image from "next/image";
import styles from "../user.module.scss";
import Socials from "./Socials";
import About from "./About";
import Time from "./Time";
import Rating from "./Rating";

type Props = {
  promise: Promise<User>;
};

export default async function UserCard({ promise }: Props) {
  const user = await promise;

  return (
    <div className={`${styles.userCard} w-full lg:w-1/2  mb-4 lg:mb-0 cardBg`}>
      <div className={styles.topRow}>
        <div className={styles.profilePic}>
          <Image
            src={user.profilePicture ? user.profilePicture : "/user.svg"}
            alt={user.name ? user.name : user.address + " profile picture"}
            width={500}
            height={500}
          />
        </div>

        <div className={styles.userDetails}>
          <h1 className={styles.userName}>
            {user.name ? user.name : "Anonymous🤫"}
          </h1>
          <p className={styles.occupation}>
            {user.occupation ? user.occupation : "Not specified 🤷‍♂️"}
          </p>
          <Rating rating={5} quantity={327} />
          <Time timeZone={user.timeZone} />
        </div>
      </div>
      <Socials />
      <About
        description={user.description ? user.description : "Not specified 🤷‍♂️"}
      />
    </div>
  );
}
