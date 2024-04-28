// import dynamic from "next/dynamic";
import { FC } from "react";
import React from "react";

// const ProfileModal = dynamic(
//   () => import("@/components/profile/profile-modal"),
//   {
//     ssr: false,
//   }
// );
import { CommandSearch } from "../command-palette";
import { WalletButton } from "../wallet/wallet-button";

import { ColorModeButton } from "./color-mode-button";
import { Navbar } from "./navbar";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => (
  <div className="fixed flex flex-row min-w-screen justify-between items-center p-4 w-full z-50">
    <div className="flex gap-2">
      <Navbar />
      <CommandSearch className="w-[160px]" />
    </div>
    <div className="flex flex-row items-center gap-2">
      <WalletButton />
      <ColorModeButton />
      {/* <ProfileModal /> */}
    </div>
  </div>
);
