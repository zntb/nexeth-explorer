import Image from "next/image";
import { FC } from "react";

import { CommandSearch } from "../command-palette";
import { useDesktopOnly, useMobileDesktop } from "../hooks";
import { nexethLogoTransparent } from "../images";
import { Badge } from "../ui/badge";

import { EthPrice } from "./eth-price";
import { Navbar } from "./navbar";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => (
  <div className="fixed flex flex-row min-w-screen justify-between items-center p-2 w-full z-50 backdrop-blur-sm shadow rounded-b-md">
    <div className="flex gap-2 items-center">
      {useDesktopOnly(
        <div className="relative">
          <Image
            src={nexethLogoTransparent}
            alt="Nexeth Logo"
            width={40}
            height={40}
          />
          <Badge
            variant="secondary"
            className="text-[8px] opacity-80 px-1 h-4 absolute top-0 left-5"
          >
            Beta
          </Badge>
        </div>
      )}
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
