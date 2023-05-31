"use client";
import { useState, useEffect } from "react";

import { signInWithCustomToken, signOut } from "firebase/auth";
import { getDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ethers } from "ethers";
import Link from "next/link";
import { auth, db } from "@/lib/initFirebase";
import useFirebaseUser from "@/lib/useFirebaseUser";

import styles from "./ConnectWallet.module.scss";
import nav from "./nav.module.scss";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function ConnectWallet() {
  const [address, setAddress] = useState("");

  const { user } = useFirebaseUser();

  useEffect(() => {
    if (user) {
      setAddress(user.uid);
    } else {
      setAddress("");
    }
  }, [user]);

  const signIn = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const message = `Sign this message to authenticate with your Ethereum address ${address}`;
      const signature = await signer.signMessage(message);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, signature }),
      });

      const { token } = await res.json();
      const userCredential = await signInWithCustomToken(auth, token);
      const user = userCredential.user;

      const usersRef = doc(db, "users", user.uid!);
      const userDoc = await getDoc(usersRef);

      if (!userDoc.exists()) {
        setDoc(usersRef, { createdAt: serverTimestamp() }, { merge: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const [connectedAddress] = await (window.ethereum as any).request({
        method: "eth_requestAccounts",
      });
      setAddress(connectedAddress);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.popupContainer}>
      {address ? (
        <div>
          {!user ? (
            <button onClick={() => signIn()} className={nav.action}>
              Sign In
            </button>
          ) : (
            <Link href="/dashboard" className={nav.action}>
              Dashboard
            </Link>
          )}
        </div>
      ) : (
        <button onClick={() => connectWallet()} className={nav.action}>
          Connect
        </button>
      )}
    </div>
  );
}
