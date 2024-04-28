import { DashboardIcon, HomeIcon } from "@radix-ui/react-icons";

export interface CommandProps {
  title: string;
  icon: JSX.Element;
  href?: string;
  callback?: () => void;
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
];
