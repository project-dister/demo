import { Quicksand } from "next/font/google";

import { Toaster } from "react-hot-toast";

import "./globals.scss";

export const metadata = {
  title: "Dister.org | Web 3.0 Freelance Marketplace",
  description:
    "Dister is a decentralized freelance marketplace built on the Ethereum blockchain.",
};

const font = Quicksand({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
