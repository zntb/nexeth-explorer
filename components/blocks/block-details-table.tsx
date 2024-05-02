import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { formatEther } from "ethers/lib/utils";
import Link from "next/link";
import { FC } from "react";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { KeyValueTable } from "../ui/key-value-table";
import Typography from "../ui/typography";

import { createBlockLink, slugToChain } from "@/lib";
import { Block } from "@/server";

export interface BlockDetailsTableProps {
  chain: string;
  block: Block;
}

export const BlockDetailsTable: FC<BlockDetailsTableProps> = ({
  block,
  chain,
}) => (
  <Card>
    <KeyValueTable
      data={{
        "Block Height": <BlockHeight block={block} chain={chain} />,
        Chain: slugToChain[chain].name,
        Status: "",
        Timestamp: new Date(block.timestamp * 1000).toUTCString(),
        Hash: block.hash,
        ParentHash: block.parentHash,
        Miner: block.miner,
        Difficulty: block.difficulty,
        GasLimit: formatEther(block.gasLimit),
        GasUsed: formatEther(block.gasUsed),
        Transactions: block.transactions.length,
      }}
    />
  </Card>
);

const BlockHeight: FC<BlockDetailsTableProps> = ({ block, chain }) => (
  <div className="flex gap-2 item-center">
    <Typography variant="p">{block.number}</Typography>
    <Link href={createBlockLink({ chain, block: block.number - 1 })}>
      <Button size="small-icon" variant="outline">
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
    </Link>
    <Link href={createBlockLink({ chain, block: block.number + 1 })}>
      <Button size="small-icon" variant="outline">
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </Link>
  </div>
);
