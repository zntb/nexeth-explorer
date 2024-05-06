export interface NavigationItem {
  label: string;
  description?: string;
  href: string;
  icon?: JSX.Element;
  children?: NavigationItem[];
  external?: boolean;
}

export const navigationConfig: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/explorer",
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
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "FAQ",
        href: "/faq",
        description: "Frequently asked questions about Nexeth.",
      },
      {
        label: "GitHub",
        href: "https://github.com/mfbevan/nexeth-explorer",
        description: "View the source code on GitHub.",
        external: true,
      },
      {
        label: "Twitter",
        href: "https://twitter.com/0xmfbevan",
        description: "Follow us on Twitter for updates.",
      },
      {
        label: "Privacy Policy",
        href: "/legal/privacy-policy",
        description: "Our privacy policy.",
      },
      {
        label: "Terms of Use",
        href: "/legal/terms-of-use",
        description: "Our terms of use.",
      },
    ],
  },
];
