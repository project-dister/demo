import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-semibold">
        How to participate in the demo
      </h1>
      <h2 className="text-2xl font-md mt-4">
        This tutorial assumes that you have Metamask installed and know how to
        use it on a basic level
      </h2>
      <hr className="my-8 border-orange-500" />
      <section id="register">
        <h2 className="text-2xl font-md orangeText">How to register</h2>
        <ol>
          <li>
            <p className="text-xl my-4">
              Got to{" "}
              <Link
                href={"https://chainlist.org/?testnets=true&search=mumbai"}
                target="_blank"
                className="underline orangeText"
              >
                Chainlist
              </Link>{" "}
              to add the Polygon Mumbai test network
            </p>
            <Image
              src={"/images/tutorial/connect-wallet.jpg"}
              width={700}
              height={400}
              alt="connect wallet"
              className="rounded-2xl"
            />
          </li>
          <li>
            <p className="text-xl my-4">Then click Add to Metamask</p>
            <Image
              src={"/images/tutorial/add-to-metamask.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl"
            />
          </li>
          <li>
            <p className="text-xl my-4">
              Got to{" "}
              <Link
                href={"https://faucet.polygon.technology/"}
                target="_blank"
                className="underline orangeText"
              >
                Polygon Faucet
              </Link>{" "}
              to get some fake MATIC to cover transaction costs.
            </p>
            <Image
              src={"/images/tutorial/faucet-matic.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl"
            />
          </li>
          <li>
            <p className="text-xl my-4">
              Make sure you import the faucet USDC token on the MUMBAI test
              network{" "}
              <span className="underline orangeText">
                0x0FA8781a83E46826621b3BC094Ea2A0212e71B23
              </span>{" "}
              by pasting this address
            </p>

            <Image
              src={"/images/tutorial/import-token.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl"
            />
          </li>
          <li>
            <Image
              src={"/images/tutorial/import-usdc.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl mt-4"
            />
          </li>
          <li>
            <p className="text-xl my-4">
              Go to the{" "}
              <Link
                href={"https://twitter.com/usdcpatron"}
                target="_blank"
                className="underline orangeText"
              >
                USDC faucet
              </Link>{" "}
              to get some testnet USDC{" "}
              <span className="underline orangeText"></span> follow the
              instructions, make sure you follow{" "}
              <Link
                href={"https://twitter.com/usdcpatron"}
                target="_blank"
                className="underline orangeText"
              >
                @usdcpatron
              </Link>{" "}
              and, make sure you select the POLYGON. You will receive 10 USDC.
            </p>

            <Image
              src={"/images/tutorial/get-usdc.jpg"}
              width={700}
              height={400}
              alt="add test network"
              className="rounded-2xl"
            />
          </li>
          <li>
            <p className="text-xl my-4">
              Once you've done all these things, you should just be able to
              connect your wallet and sign in, then you are good to go and use
              all the currently available functionalities of the platform.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
