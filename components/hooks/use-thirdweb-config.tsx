import {
  ThirdwebAuthConfig,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { DAppMetaData } from "@thirdweb-dev/wallets";

import { THIRDWEB_CLIENT_ID, WALLET_CONNECT_PROJECT_ID } from "@/lib/constants";
import { getBaseUrl } from "@/lib/utils/url";

export const useProviderConfig = () => {
  const clientId = THIRDWEB_CLIENT_ID;
  const projectId = WALLET_CONNECT_PROJECT_ID;
  const activeChain = undefined; // Specify a chain here if you want to force the user onto a specific chain

  const dAppMetadata: DAppMetaData = {
    name: "Project: Ares",
    description: "This is a description",
    url: getBaseUrl(),
  };

  const authConfig: ThirdwebAuthConfig = {
    domain: getBaseUrl(),
    authUrl: "/api/auth",
  };

  const supportedWallets = [
    metamaskWallet({ projectId }),
    walletConnect({ projectId }),
    coinbaseWallet(),
    rainbowWallet({ projectId }),
    safeWallet(),
    localWallet(),
  ];

  return {
    clientId,
    projectId,
    activeChain,
    dAppMetadata,
    supportedWallets,
    authConfig,
  };
};
