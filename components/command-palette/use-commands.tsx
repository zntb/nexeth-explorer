import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  useConnect,
  useDisconnect,
  useSetIsWalletModalOpen,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { FC, useMemo } from "react";
import { FaWallet } from "react-icons/fa";

import { useSession } from "../hooks";
import { CommandItem } from "../ui/command";

import { useCommandPalette } from "./command-palette-store";
import { CommandProps, navigationCommands } from "./commands";

export const useCommands = () => {
  const { setTheme } = useTheme();
  const onWalletOpen = useSetIsWalletModalOpen();
  const onDisconnect = useDisconnect();
  const { isConnected } = useSession();

  const navigation = navigationCommands.map((command) => (
    <Command key={command.title} {...command} />
  ));

  const wallet = (
    isConnected
      ? [
          {
            title: "Disconnect Wallet",
            icon: <FaWallet />,
            callback: () => onDisconnect(),
          },
        ]
      : [
          {
            title: "Connect Wallet",
            icon: <FaWallet />,
            callback: () => onWalletOpen(true),
          },
        ]
  ).map((command) => <Command key={command.title} {...command} />);

  const theme = [
    {
      title: "Light Theme",
      icon: <SunIcon />,
      callback: () => setTheme("light"),
    },
    {
      title: "Dark Theme",
      icon: <MoonIcon />,
      callback: () => setTheme("dark"),
    },
    {
      title: "System Theme",
      icon: <MoonIcon />,
      callback: () => setTheme("system"),
    },
  ].map((command) => <Command key={command.title} {...command} />);

  const all = [...navigation, ...theme, wallet];

  return {
    navigation,
    theme,
    all,
    wallet,
  };
};

const Command: FC<CommandProps> = ({ title, href, icon, callback }) => {
  const router = useRouter();
  const { onClose } = useCommandPalette();

  const onCommand = () => {
    onClose();
    if (href) router.push(href);
    if (callback) callback();
  };

  return (
    <CommandItem
      className="flex items-center gap-2"
      key={title}
      onSelect={onCommand}
    >
      {icon}
      <span>{title}</span>
    </CommandItem>
  );
};
