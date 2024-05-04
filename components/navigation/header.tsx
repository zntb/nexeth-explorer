import { FC } from "react";
import { FaEthereum } from "react-icons/fa";

import { CommandSearch } from "../command-palette";
import { useMobileDesktop } from "../hooks";

import { EthPrice } from "./eth-price";
import { Navbar } from "./navbar";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => (
  <div className="fixed flex flex-row min-w-screen justify-between items-center p-2 w-full z-50 backdrop-blur-sm shadow rounded-b-md">
    <div className="flex gap-2 items-center pl-3">
      <FaEthereum size={20} />
      <Navbar />
    </div>
    <div className="flex flex-row items-center gap-2">
      <EthPrice />
      <CommandSearch label={useMobileDesktop("🔍", "🔍 Search")} />
      {/* <WalletButton /> */}
      {/* <ColorModeButton /> */}
      {/* <ProfileModal /> */}
    </div>
  </div>
);
