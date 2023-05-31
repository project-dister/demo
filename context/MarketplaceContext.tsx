// MarketplaceContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Marketplace_ABI from "./Marketplace_ABI.json";

const marketplaceAddress = "0x592eC349eC58388451eA08847f96413C94974380";

interface EthereumWindow extends Window {
  ethereum: {
    request: (options: any) => Promise<any>;
  };
}

declare const window: EthereumWindow;

const MarketplaceContext = createContext<ethers.Contract | null>(null);

export const useMarketplace = () => {
  return useContext(MarketplaceContext);
};

export function MarketplaceProvider ({ children }: { children: React.ReactNode }) {
  const [marketplace, setMarketplace] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum as any);
          const signer = await provider.getSigner();
          const marketplace = new ethers.Contract(
            marketplaceAddress,
            Marketplace_ABI,
            signer
          );
          setMarketplace(marketplace);
        } catch (err) {
          console.error(err);
        }
      }
    };
    init();
  }, []);

  return (
    <MarketplaceContext.Provider value={marketplace}>
      {children}
    </MarketplaceContext.Provider>
  );
};
