import { DashboardIcon, HomeIcon } from "@radix-ui/react-icons";
import { FaEthereum } from "react-icons/fa";
import { SiIpfs } from "react-icons/si";

import { supportedChainsAndTestnets } from "@/lib";

export interface CommandProps {
  title: string;
  icon?: JSX.Element;
  href?: string;
  callback?: () => void;
  chain?: string;
  external?: boolean;
}

export const navigationCommands: CommandProps[] = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Dashboards",
    href: "/dashboards",
    icon: <DashboardIcon />,
  },
  {
    title: "Chains",
    href: "/chains",
    icon: <FaEthereum />,
  },
  {
    title: "IPFS",
    href: "/ipfs",
    icon: <SiIpfs />,
  },
  ...supportedChainsAndTestnets.map((chain) => ({
    title: `Chains / ${chain.name}`,
    href: `/chains/${chain.slug}`,
    chain: chain.slug,
  })),
];
