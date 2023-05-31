import Image from "next/image";
import styles from "./sidebar.module.scss";

type User = {
  address: string;
  name: string;
  profilePicture: string | null;
};

type SidebarItemProps = {
  user: any;
  onClick: () => void;
};

export default function SidebarItem({ user, onClick }: SidebarItemProps) {
  return (
    <div
      key={user.address}
      className={`${styles.chatItem} w-14 h-14 lg:flex lg:h-auto lg:w-full flex-shrink-0 mr-3 lg:mr-0`}
      onClick={onClick}
    >
      {user.profilePicture && (
        <Image
          src={user.profilePicture}
          width={60}
          height={60}
          alt={user.name}
          className={`${styles.avatar} object-cover`}
        />
      )}
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:ml-3">
        <p>{user.name}</p>
      </div>
    </div>
  );
}
