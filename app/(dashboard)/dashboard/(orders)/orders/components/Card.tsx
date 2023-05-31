import styles from "./Card.module.scss";
import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import useFirebaseUser from "@/lib/useFirebaseUser";
import StatusBox from "./common/StatusBox";
import formatOrderDate from "@/helpers/formatOrderDate";

type Order = DocumentData & { orderId: string };

interface CardProps {
  order: Order;
  onClick: (event: React.MouseEvent<HTMLDivElement>, data: Order) => void;
}

export default function Card({ order, onClick }: CardProps) {
  const { user: currentUser } = useFirebaseUser();

  let oppositeUserAddress;
  if (currentUser && currentUser.uid === order.sellerAddress) {
    oppositeUserAddress = order.buyerAddress;
  } else {
    oppositeUserAddress = order.sellerAddress;
  }

  const formattedDate = formatOrderDate(order.timestamp, order.deliveryDate);

  return (
    <div
      className={styles.cardWrapper}
      onClick={(event) => onClick(event, order)}
    >
      <div className={`${styles.card} lightWhiteText cardBg`}>
        <div className={styles.header}>
          <Image
            src={order.offerData.images[0]}
            alt="Thumbnail"
            width={50}
            height={50}
            className={styles.image}
          />
          <span className={styles.title}>
            {order.offerData.title && order.offerData.title.length > 15
              ? order.offerData.title.slice(0, 35) + "..."
              : order.offerData.title}
          </span>
        </div>
        <div className={styles.content}>
          <p className={styles.username}>
            {order.buyerData
              ? order.buyerData.name
                ? order.buyerData.name
                : order.buyerData.address.slice(0, 4) +
                  "..." +
                  order.buyerData.address.slice(-4)
              : order.sellerData
              ? order.sellerData.name
                ? order.sellerData.name
                : order.sellerData.address.slice(0, 4) +
                  "..." +
                  order.sellerData.address.slice(-4)
              : ""}
          </p>
          <StatusBox status={order.status} date={formattedDate} />
        </div>
      </div>
    </div>
  );
}
