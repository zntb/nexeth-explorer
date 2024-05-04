import { FC } from "react";

import { Button } from "../ui/button";

import { useCommandPaletteStore } from "./command-palette-store";

export interface CommandOpenActionProps {
  search: string;
  icon: JSX.Element | string;
  label: string;
  color?: string;
}

export const CommandOpenAction: FC<CommandOpenActionProps> = ({
  search,
  icon,
  label,
  color,
}) => {
  const { onOpen, setQuery } = useCommandPaletteStore();

  const onClick = () => {
    setQuery(search);
    onOpen();
  };

  return (
    <Button
      onClick={onClick}
      size="xs"
      variant="outline"
      className="flex items-center gap-2 font-light pl-1"
      color={color}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Button>
  );
};
