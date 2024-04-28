import dynamic from "next/dynamic";
import Link from "next/link";
import { FC } from "react";
import React from "react";

const ProfileModal = dynamic(
  () => import("@/components/profile/profile-modal"),
  {
    ssr: false,
  }
);
import { WalletButton } from "../wallet/wallet-button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => (
  <div className="fixed flex flex-row min-w-screen justify-between items-center p-4 w-full z-50">
    <Navbar />
    <div className="flex flex-row items-center gap-2">
      <WalletButton />
      <ProfileModal />
    </div>
  </div>
);

const Navbar = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
