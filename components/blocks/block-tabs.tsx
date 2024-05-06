import { Chain } from "@thirdweb-dev/chains";
import { FC } from "react";

import { TransactionsTable } from "../transactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Block, LiteTransaction } from "@/server";

export interface BlockTabsProps {
  block: Block;
  transactions: LiteTransaction[];
  chain: Chain;
}

export const BlockTabs: FC<BlockTabsProps> = ({
  block,
  transactions,
  chain,
}) => (
  <Tabs defaultValue="transactions">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="transactions">Transactions</TabsTrigger>
    </TabsList>
    <TabsContent value="transactions">
      {block.transactions.length > 0 ? (
        <TransactionsTable
          transactions={transactions}
          chain={chain}
          hide={{ block: true, type: true, token: true, value: true }}
        />
      ) : (
        <p>No transactions in this block</p>
      )}
    </TabsContent>
  </Tabs>
);
