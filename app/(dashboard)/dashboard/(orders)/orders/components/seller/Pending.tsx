import FileUpload from "../common/FileUpload";
import CountdownTimer from "../common/CountdownTimer";
import { BsClock } from "react-icons/bs";

import PriceBox from "../common/PriceBox";
import StatusBox from "../common/StatusBox";

interface PendingProps {
  deadline: {
    days: number;
    hours: number;
    minutes: number;
  };
  orderDate: string;
  status: string;
  price: number;
  order: Order;
  orderId: string;
}

const Pending: React.FC<PendingProps> = ({
  deadline,
  orderDate,
  status,
  price,
  order,
  orderId,
}) => {
  return (
    <>
      <div className="flex justify-between w-full mt-5">
        <div className="flex flex-col gap-2 text-left mt-1">
          <StatusBox status={status} date={orderDate} />
          <PriceBox price={price} />
        </div>
        <div>
          <p className="flex items-center mb-1">
            <BsClock className="mr-1" /> Time left to deliver
          </p>
          <CountdownTimer
            days={deadline.days}
            minutes={deadline.minutes}
            hours={deadline.hours}
          />
        </div>
      </div>
      <FileUpload order={order} orderId={orderId} />
    </>
  );
};

export default Pending;
