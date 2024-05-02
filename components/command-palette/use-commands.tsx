import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useDisconnect, useSetIsWalletModalOpen } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { FC, useMemo } from "react";
import { FaSearch, FaWallet } from "react-icons/fa";

import { useSession } from "../hooks";
import { CommandItem } from "../ui/command";
import { Skeleton } from "../ui/skeleton";

import { useCommandPaletteStore as useCommandPalette } from "./command-palette-store";
import { CommandProps, navigationCommands } from "./commands";

import { trpc } from "@/server";

export const useCommands = () => {
  const { setTheme } = useTheme();
  const onWalletOpen = useSetIsWalletModalOpen();
  const onDisconnect = useDisconnect();
  const { isConnected } = useSession();
  const { query } = useCommandPalette();

  const { data = { results: [] }, isFetching } = trpc.search.get.useQuery(
    { query },
    { keepPreviousData: false }
  );

  const navigation = useMemo(() => toCommands(navigationCommands), []);

  const search = useMemo(() => {
    if (isFetching) {
      console.log("loading");
      return [
        <CommandItem key="loading-search-results" value={query}>
          <Skeleton className="w-full h-5" />
        </CommandItem>,
      ];
    }
    if (data.results.length > 0) {
      console.log("results");
      return toCommands(
        data.results.map((result) => ({
          title: result.title,
          href: result.href,
          icon: <FaSearch />,
        }))
      );
    }

    console.log("empty");
    return [
      <CommandItem key="loading-search-results" value={query}>
        No results found.
      </CommandItem>,
    ];
  }, [data.results, isFetching, query]);

  const wallet = useMemo(
    () =>
      toCommands(
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
      ),
    [isConnected, onDisconnect, onWalletOpen]
  );

  const theme = toCommands([
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
  ]);

  return {
    navigation,
    theme,
    wallet,
    search,
  };
};

const toCommands = (commands: CommandProps[]) =>
  commands.map((command) => <Command key={command.title} {...command} />);

const Command: FC<CommandProps> = ({ title, href, icon, callback }) => {
  const router = useRouter();
  const { onClose, setQuery } = useCommandPalette();

  const onCommand = () => {
    onClose();
    setQuery("");
    if (href) router.push(href);
    if (callback) callback();
  };

  return (
    <CommandItem
      className="flex items-center gap-2"
      key={title}
      value={href}
      onSelect={onCommand}
    >
      {icon}
      <span>{title}</span>
    </CommandItem>
  );
};
