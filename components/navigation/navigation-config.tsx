export interface NavigationItem {
  label: string;
  description?: string;
  href: string;
  icon?: JSX.Element;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/",
    children: [
      {
        label: "Chains",
        href: "/chains",
        description: "Explore available chains and testnets.",
      },
      {
        label: "Dashboards",
        href: "/dashboards",
        description: "All of your Ethereum related dashboards in one place.",
      },
      {
        label: "IPFS",
        href: "/ipfs",
        description: "Explore IPFS stats and view IPFS data.",
      },
    ],
  },
];
