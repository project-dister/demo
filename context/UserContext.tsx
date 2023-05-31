"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import getUser from "@/lib/getUser";

type UserContextProps = {
  user: User | null;
  loading: boolean;
};

const UserContext = createContext<UserContextProps>({
  user: null,
  loading: true,
});

export const UserProvider: React.FC<{
  address: string;
  children: React.ReactNode;
}> = ({ address, children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(address).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [address]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
