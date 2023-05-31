import Link from "next/link";
import styles from "./categories.module.scss";

interface CategoryItemProps {
  title: string;
  icon: React.ReactNode;
  link: string;
  isSelected?: boolean;
}

export default function CategoryItem({
  title,
  icon,
  link,
  isSelected,
}: CategoryItemProps) {
  return (
    <Link href={`/category/${link}`}>
      <div
        className={`flex flex-col items-center justify-center gap-2 p-3 cursor-pointer ${
          isSelected ? styles.active : styles.item
        }`}
      >
        {icon}
        <div className="font-medium text-sm whitespace-nowrap">{title}</div>
      </div>
    </Link>
  );
}
