import { Chain } from "@thirdweb-dev/chains";
import { Transaction } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import Link from "next/link";
import { FC } from "react";

import { LinkedChainIcon } from "../chains";
import { Card } from "../ui/card";
import { KeyValueTable } from "../ui/key-value-table";

import { createBlockLink, shortenString } from "@/lib";

export interface TransactionDetailsTableProps {
  transaction: Transaction;
  chain: Chain;
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
          Chain: <LinkedChainIcon chain={chain} />,
          From: transaction.from,
          To: transaction.to,
          Data: shortenString(transaction.data),
          Value: formatEther(transaction.value),
          "Gas Price": `${formatUnits(transaction.gasPrice ?? 0, "gwei")} Gwei`,
          "Gas Limit": `${formatUnits(transaction.gasLimit, "wei")} wei`,
          Nonce: transaction.nonce,
        }}
      />
    </Card>
  );
};
