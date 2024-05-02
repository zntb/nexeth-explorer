import { Transaction } from "ethers";
import { formatEther } from "ethers/lib/utils";
import Link from "next/link";
import { FC } from "react";

import { Card } from "../ui/card";
import { KeyValueTable } from "../ui/key-value-table";

import { createBlockLink, shortenString, slugToChain } from "@/lib";

export interface TransactionDetailsTableProps {
  transaction: Transaction;
  chain: string;
}

export const TransactionDetailsTable: FC<TransactionDetailsTableProps> = ({
  transaction,
  chain,
}) => {
  const { blockNumber: block } = transaction as Transaction & {
    blockNumber: number;
  };

  return (
    <Card>
      <KeyValueTable
        data={{
          Hash: transaction.hash,
          "Block Number": (
            <Link href={createBlockLink({ chain, block })}>{block}</Link>
          ),
          Chain: slugToChain[chain].name,
          From: transaction.from,
          To: transaction.to,
          Data: shortenString(transaction.data),
          Value: formatEther(transaction.value),
          Gas: formatEther(transaction.gasLimit),
          GasPrice: formatEther(transaction.gasPrice ?? 0),
          Nonce: transaction.nonce,
        }}
      />
    </Card>
  );
};
