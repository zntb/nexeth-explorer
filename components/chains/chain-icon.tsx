import { Chain } from "@thirdweb-dev/chains";
import { useResolvedMediaType } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { createChainLink } from "@/lib";

export interface ChainIconProps {
  chain: Chain;
  size?: number;
}

export const ChainIcon: FC<ChainIconProps> = ({ chain, size = 40 }) => (
  <Image
    className="object-contain"
    src={useResolvedMediaType(chain.icon?.url).url}
    alt={chain.name}
    width={size}
    height={size}
    style={{ height: `${size}px`, width: `${size}px` }}
  />
);

export const LinkedChainIcon: FC<ChainIconProps> = ({ chain, size = 15 }) => (
  <Link href={createChainLink({ chain })}>
    <div className="flex items-center gap-1">
      <ChainIcon chain={chain} size={size} /> {chain.name}
    </div>
  </Link>
);
