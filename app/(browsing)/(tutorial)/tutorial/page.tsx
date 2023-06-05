import styles from "./tutorial.module.scss";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default ({}: Props) => {
  return (
    <div className="text-center text-6xl h-screen">
      <Link href={"/tutorial/register"}>Register</Link> |{" "}
      <Link href={"/tutorial/order"}>Order</Link>
    </div>
  );
};
