import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useDisconnect, useSetIsWalletModalOpen } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { FC } from "react";
import { FaWallet } from "react-icons/fa";
import { PiTestTubeDuotone } from "react-icons/pi";

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

  const test = [
    {
      title: "Test Block #19754226",
      icon: <PiTestTubeDuotone />,
      href: "/block/ethereum/19754226",
    },
    {
      title: "Test Transaction 0xaf3fea...fda17333",
      icon: <PiTestTubeDuotone />,
      href: "/tx/ethereum/0xaf3feac62a57297724efcd67142b598131dbf74c2955d4f81333fb09fda17333",
    },
  ].map((command) => <Command key={command.title} {...command} />);

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

  return {
    navigation,
    theme,
    wallet,
    test,
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
