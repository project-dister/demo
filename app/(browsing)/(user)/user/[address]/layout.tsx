import getUser from "@/lib/getUser";
import { Metadata } from "next";

type Params = {
  params: {
    address: string;
  };
};

export async function generateMetadata({
  params: { address },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(address);
  const user: User = await userData;

  return {
    title: user.name || address + " | Dister",
    description: `This is the dister profile of ${
      user.name || address
    }, check out their offers!`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
