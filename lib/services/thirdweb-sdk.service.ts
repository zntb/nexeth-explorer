import { ChainOrRpcUrl, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Signer } from "ethers";

import {
  THIRDWEB_CLIENT_ID,
  THIRDWEB_AUTH_PRIVATE_KEY,
  THIRDWEB_SECRET_KEY,
} from "../constants";

export const clientThirdWebSDK = (signer: Signer, network: ChainOrRpcUrl) =>
  ThirdwebSDK.fromSigner(signer, network, {
    clientId: THIRDWEB_CLIENT_ID,
  });

export const serverThirdWebSDK = (network: ChainOrRpcUrl) =>
  ThirdwebSDK.fromPrivateKey(THIRDWEB_AUTH_PRIVATE_KEY, network, {
    secretKey: THIRDWEB_SECRET_KEY,
  });
