// import dynamic from "next/dynamic";
import Image from "next/image";
import { FC } from "react";
import React from "react";

// const ProfileModal = dynamic(
//   () => import("@/components/profile/profile-modal"),
//   {
//     ssr: false,
//   }
// );
import { CommandSearch } from "../command-palette";
import { useDesktopOnly } from "../hooks";
import { nexethLogoTransparent } from "../images";

import { Navbar } from "./navbar";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => (
  <div className="fixed flex flex-row min-w-screen justify-between items-center p-2 w-full z-50 backdrop-blur-sm shadow rounded-b-md">
    <div className="flex gap-2 items-center">
      {useDesktopOnly(
        <Image
          src={nexethLogoTransparent}
          alt="Nexeth Logo"
          width={40}
          height={40}
          style={{ filter: "saturate(0%) " }}
        />
      )}
      <Navbar />
    </div>
    <div className="flex flex-row items-center gap-2">
      <CommandSearch className="w-[160px] md:w-[250px] flex-row-reverse" />
      {/* <WalletButton /> */}
      {/* <ColorModeButton /> */}
      {/* <ProfileModal /> */}
    </div>
  </div>
);
