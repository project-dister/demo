import Image from "next/image";
import { IoChatboxOutline } from "react-icons/io5";

import styles from "./UserInfo.module.scss";
import Link from "next/link";
interface UserInfoProps {
  user: User | null;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      {user ? (
        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <Image
                src={user?.profilePicture || "/blank.webp"}
                width={50}
                height={50}
                alt="profile-pic"
                className={styles.profilePic}
              />
              <div className="flex flex-col">
                <Link
                  href={`/user/${user.address}`}
                  target="_blank"
                  className={styles.username}
                >
                  {user.name ||
                    user?.address.slice(0, 4) + user?.address.slice(-4)}
                </Link>
                <p className={styles.occupation}>
                  {user?.occupation || "Not Specified 🤷‍♂️"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center justify-end space-x-2">
              <IoChatboxOutline
                className={`${styles.message} cardBg orangeText`}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>dsf</p>
      )}
    </>
  );
}
