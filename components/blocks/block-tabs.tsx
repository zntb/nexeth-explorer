import { Chain } from "@thirdweb-dev/chains";
import { FC } from "react";

import { TransactionsTable } from "../transactions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Block } from "@/server";

export interface BlockTabsProps {
  block: Block;
  chain: Chain;
}

export const BlockTabs: FC<BlockTabsProps> = ({ block, chain }) => (
  <Tabs defaultValue="transactions">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="transactions">Transactions</TabsTrigger>
      <TabsTrigger value="test">Test</TabsTrigger>
    </TabsList>
    <TabsContent value="transactions">
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Transactions in this block</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {block.transactions.length > 0 ? (
            <TransactionsTable
              transactions={[]} // TODO: add transactions
              chain={chain}
            />
          ) : (
            <p>No transactions in this block</p>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);
