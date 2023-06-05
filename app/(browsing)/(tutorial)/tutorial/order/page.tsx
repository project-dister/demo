import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-semibold">How to order</h1>
      <h2 className="text-2xl font-md mt-4">
        The only way to create an order currently is to message a seller, and
        the seller send you an offer which you can choose to accept
      </h2>
      <hr className="my-8 border-orange-500" />
      <section id="register">
        <h2 className="text-2xl font-md orangeText">How to create an order</h2>
        <ol>
          <li>
            <p className="text-xl my-4">
              Go to an offer page and click the send message button to create a
              chat between you and the seller
            </p>
            <Image
              src={"/images/tutorial/send-message.jpg"}
              width={700}
              height={400}
              alt="connect wallet"
              className="rounded-2xl"
            />
          </li>
          <li>
            <p className="text-xl my-4">Click the accept button</p>
            <Image
              src={"/images/tutorial/accept-offer.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl"
            />
            <p className="text-xl my-4">
              When you click the accept button, currently you'll have to approve
              the smart contract to spend the price of the order in usdc
            </p>
            <Image
              src={"/images/tutorial/approve-spending.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl"
            />
            <p className="text-xl my-4">
              Then you will have to confirm the order
            </p>
          </li>
          <li>
            <p className="text-xl my-4">
              The seller can deliver the order withing the agreed time in
              minutes
            </p>
            <Image
              src={"/images/tutorial/deliver-order.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl"
            />
            <p className="text-xl my-4">
              If the seller delivers withing the agreed time, you can choose to
              download and accept or refuse the order
            </p>
            <Image
              src={"/images/tutorial/acceptorder.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl"
            />
            <p className="text-xl my-4">
              You have 3 minutes to to choose, if you don't the buyer has the
              option to automatically finish the order and get the money.
            </p>
            <p className="text-xl my-4">
              On the other hand, if the seller doesn't deliver within the
              deadline, you can choose to get an automatic refund
            </p>
            <p className="text-xl orangeText my-4">
              If you choose to to decline the order, we would normally go into
              dispute mode, but that is not available in the demo yet
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
