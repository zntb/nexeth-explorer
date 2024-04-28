import { Chain } from "@thirdweb-dev/chains";
import { useResolvedMediaType } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardTitle } from "../ui/card";

export interface ChainCardProps {
  chain: Chain;
}

export const ChainCard: React.FC<ChainCardProps> = ({ chain }) => (
  <Link href={`/chains/${chain.slug}`}>
    <Card className="h-full hover:shadow-xl p-6">
      <div className="flex flex-row items-center gap-4">
        <Image
          className="object-contain"
          src={useResolvedMediaType(chain.icon?.url).url}
          alt={chain.name}
          width={chain.icon?.width || 40}
          height={chain.icon?.height || 40}
          style={{ height: "40px", width: "40px" }}
        />
        <div className="flex flex-col gap-2">
          <CardTitle className="font-medium">{chain.name}</CardTitle>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">Chain ID</p>
              <p className="text-xs">{chain.chainId}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">Native Token</p>
              <p className="text-xs">{chain.nativeCurrency.symbol}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Link>
);
