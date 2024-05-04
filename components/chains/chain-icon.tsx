import { Chain } from "@thirdweb-dev/chains";
import { useResolvedMediaType } from "@thirdweb-dev/react";
import Image from "next/image";
import { FC } from "react";

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
