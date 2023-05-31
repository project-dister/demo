"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import styles from "./(dashboard)/dashboard.module.scss";
import { useRouter } from "next/navigation";
import useFirebaseUser from "@/lib/useFirebaseUser";
import { MarketplaceProvider } from "@/context/MarketplaceContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading: loadingAuth } = useFirebaseUser();

  const [metamaskSessionExpired, setMetamaskSessionExpired] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth) {
      if (!user) {
        router.push("/");
      } else {
        const init = async () => {
          if (window.ethereum) {
            try {
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              if (accounts.length === 0) {
                setMetamaskSessionExpired(true);
                setWalletConnected(false);
              } else {
                setMetamaskSessionExpired(false);
                setWalletConnected(true);
              }

              window.ethereum.on(
                "accountsChanged",
                async (accounts: string[]) => {
                  if (accounts.length === 0) {
                    setMetamaskSessionExpired(true);
                    setWalletConnected(false);
                  } else {
                    setMetamaskSessionExpired(false);
                    setWalletConnected(true);
                  }
                }
              );
            } catch (err) {
              console.error(err);
            }
          }
        };
        init();
      }
    }
  }, [user, router, loadingAuth]);

  const [showNavbar, setShowNavbar] = useState(false);

  const handleToggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  if (metamaskSessionExpired || !walletConnected) {
    return (
      <div className="w-full text-center p-12">
        <h1 className="text-white text-3xl ">
          MetaMask session expired, please enter password in MetaMask.
        </h1>
      </div>
    );
  }

  return (
    <MarketplaceProvider>
      <div className={`${styles.dashboard}`}>
        <Navbar
          className={showNavbar ? "block md:hidden" : "hidden md:block"}
        />
        <button
          className={`${styles.hideShow} md:hidden`}
          onClick={handleToggleNavbar}
        >
          {showNavbar ? "Hide Navbar" : "Show Navbar"}
        </button>
        <div className={styles.cardsContainer}>{children}</div>
      </div>
    </MarketplaceProvider>
  );
};

export default DashboardLayout;
