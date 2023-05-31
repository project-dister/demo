type User = {
  address: string;
  name: string;
  description: string;
  occupation: string;
  profilePicture: string;
  offer?: string[];
  timeZone: string;
  createdAt: Date;
};

type CategoryItem = {
  id: number;
  title: string;
  icon: string;
  route: string;
};

type Offer = {
  title: string;
  description: string;
  images: any[];
  offerId: string;
  price: number;
  deliveryDate: number;
  category: string;
  tags: string[];
  userId: string;
  createdAt: string;
};

interface Order {
  buyerAddress: string;
  deliveryDate: number;
  offerId: string;
  category: string;
  price: number;
  sellerAddress: string;
  smartContractOrderId: string;
  offerDownloadUrl?: string;
  status:
    | "accepted"
    | "completed"
    | "delivered"
    | "disputed"
    | "cancelled"
    | "autoRefunded"
    | "autoCompleted";
  timestamp: Date;
}

type MessageData = {
  sender: string;
  text: string;
  messageId: string;
};

type UserData = {
  address: string;
  name: string;
  profilePicture: string;
};

type ChatData = {
  users: UserData[];
  messages: MessageData[];
};

type BigCardProps = {
  orderDate: string;
  status: string;
  price: number;
  offerDownloadUrl?: string;
};

interface TimeRemaining {
  minutes: number;
}
