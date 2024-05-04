import { ChainExplorer } from "@thirdweb-dev/chains";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { Button } from "../ui/button";

export interface ExplorerButtonProps {
  explorer: ChainExplorer;
  type: "tx" | "address";
  location: string;
}

export const ExplorerButton: FC<ExplorerButtonProps> = ({
  explorer,
  type,
  location,
}) => {
  const url = `${explorer.url}/${type}/${location}`;

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Button size="icon" variant="secondary">
        <Image
          src={explorer.icon?.url ?? ""}
          alt={explorer.name}
          width={24}
          height={24}
        />
      </Button>
    </Link>
  );
};
