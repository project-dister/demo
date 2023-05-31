import {
  IoBookOutline,
  IoCogOutline,
  IoCubeOutline,
  IoImagesOutline,
  IoLaptopOutline,
  IoNewspaperOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoWalletOutline,
  IoShieldOutline,
  IoEllipsisHorizontalSharp,
} from "react-icons/io5";

import CategoryItem from "./CategoryItem";
import styles from "./categories.module.scss";

interface Category {
  title: string;
  icon: JSX.Element;
  link: string;
}

const list: Category[] = [
  {
    title: "Blockchain",
    icon: <IoCubeOutline className={styles.categoryIcon} />,
    link: "blockchain",
  },
  {
    title: "Smart Contracts",
    icon: <IoNewspaperOutline className={styles.categoryIcon} />,
    link: "smart-contracts",
  },
  {
    title: "DeFi",
    icon: <IoWalletOutline className={styles.categoryIcon} />,
    link: "defi",
  },
  {
    title: "NFTs",
    icon: <IoImagesOutline className={styles.categoryIcon} />,
    link: "nfts",
  },
  {
    title: "Web3 Frontend",
    icon: <IoLaptopOutline className={styles.categoryIcon} />,
    link: "web3-frontend",
  },
  {
    title: "Web3 Backend",
    icon: <IoCogOutline className={styles.categoryIcon} />,
    link: "web3-backend",
  },
  {
    title: "Security",
    icon: <IoShieldOutline className={styles.categoryIcon} />,
    link: "security",
  },
  {
    title: "Consultancy",
    icon: <IoPersonAddOutline className={styles.categoryIcon} />,
    link: "consultancy",
  },
  {
    title: "Education",
    icon: <IoBookOutline className={styles.categoryIcon} />,
    link: "education",
  },
  {
    title: "Community",
    icon: <IoPeopleOutline className={styles.categoryIcon} />,
    link: "community",
  },
  {
    title: "Other",
    icon: <IoEllipsisHorizontalSharp className={styles.categoryIcon} />,
    link: "other",
  },
];

export default function IconList({ category }: { category: string }) {
  return (
    <div className={"max-w-[2520px] mx-auto"}>
      <div
        className={`pt-4 flex flex-row items-center justify-between overflow-x-auto`}
      >
        {list.map((item: Category, i: number) => (
          <CategoryItem
            key={i}
            title={item.title}
            icon={item.icon}
            link={item.link}
            isSelected={category === item.link}
          />
        ))}
      </div>
    </div>
  );
}
