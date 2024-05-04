import { Chain } from "@thirdweb-dev/chains";
import { FC } from "react";

import { ExplorerButton } from "../explorers";
import { Card, CardTitle } from "../ui/card";

import { ChainIcon } from "./chain-icon";

export interface ChainHeaderProps {
  chain: Chain;
}

export const ChainHeader: FC<ChainHeaderProps> = ({ chain }) => (
  <Card className="h-full p-6">
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-row  gap-4">
        <ChainIcon chain={chain} />
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

      <div className="flex flex-col gap-2">
        {chain.explorers?.map((explorer) => (
          <ExplorerButton key={explorer.name} explorer={explorer} />
        ))}
      </div>
    </div>
  </Card>
);
