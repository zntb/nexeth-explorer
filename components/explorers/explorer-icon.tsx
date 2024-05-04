import { ChainExplorer } from "@thirdweb-dev/chains";
import { useResolvedMediaType } from "@thirdweb-dev/react";
import Image from "next/image";
import { FC } from "react";

export interface ExplorerIconProps {
  explorer: ChainExplorer;
  size?: number;
}

export const ExplorerIcon: FC<ExplorerIconProps> = ({
  explorer,
  size = 40,
}) => (
  <Image
    className="object-contain"
    src={useResolvedMediaType(explorer.icon?.url).url}
    alt={explorer.name}
    width={size}
    height={size}
    style={{ height: `${size}px`, width: `${size}px` }}
  />
);
