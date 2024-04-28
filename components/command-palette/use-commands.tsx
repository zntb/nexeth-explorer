import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { FC, useMemo } from "react";

import { CommandItem } from "../ui/command";

import { useCommandPalette } from "./command-palette-store";
import { CommandProps, navigationCommands } from "./commands";

export const useCommands = () => {
  const { setTheme } = useTheme();

  const navigation = useMemo(
    () =>
      navigationCommands.map((command) => (
        <Command key={command.title} {...command} />
      )),
    []
  );

  const theme = useMemo(
    () =>
      [
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
      ].map((command) => <Command key={command.title} {...command} />),
    [setTheme]
  );

  const all = useMemo(() => [...navigation, ...theme], [navigation, theme]);

  return {
    navigation,
    theme,
    all,
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
