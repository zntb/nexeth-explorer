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
    label: "Blockchain",
    href: "/blockchain",
    children: [
      {
        label: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        label: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
    ],
  },
];
