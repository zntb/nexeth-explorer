import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { ChainExplorer } from "@thirdweb-dev/chains";
import Link from "next/link";
import { FC } from "react";

import { Button } from "../ui/button";

import { toTitleCase } from "@/lib";

export interface ExplorerButtonProps {
  explorer: ChainExplorer;
  type?: "tx" | "address";
  location?: string;
}

export const ExplorerButton: FC<ExplorerButtonProps> = ({
  explorer,
  type,
  location,
}) => {
  const url =
    type && location ? `${explorer.url}/${type}/${location}` : explorer.url;
  console.log(explorer);

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Button
        size="xs"
        variant="secondary"
        className="flex items-center gap-1 font-light pl-1 justify-between w-full"
      >
        <div className="flex gap-1">
          🌐
          <span>{toTitleCase(explorer.name)}</span>
        </div>
        <ExternalLinkIcon className="w-3 h-3" />
      </Button>
    </Link>
  );
};
