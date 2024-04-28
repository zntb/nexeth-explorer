import {
  ConnectWallet,
  shortenAddress,
  useAddress,
  useWalletConfig,
} from "@thirdweb-dev/react";
import Image from "next/image";

import { useColorMode } from "../hooks";
import { Button } from "../ui/button";

export const WalletButton = () => {
  const { isLight } = useColorMode();
  const address = useAddress();
  const config = useWalletConfig();

  return (
    <ConnectWallet
      theme={isLight ? "light" : "dark"}
      showThirdwebBranding={false}
      style={{
        height: "36px",
        fontSize: "14px",
        borderRadius: "6px",
      }}
      detailsBtn={() => (
        <Button variant="outline" className="gap-2 p-2">
          <Image
            src={config?.meta.iconURL || "/favicon.ico"}
            alt="Wallet Icon"
            width={20}
            height={20}
          />
          {shortenAddress(address, false)}
        </Button>
      )}
    />
  );
};
