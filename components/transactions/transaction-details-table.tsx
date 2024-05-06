import { Chain } from "@thirdweb-dev/chains";
import { Transaction } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { FC } from "react";

import { LinkedAddress } from "../address";
import { LinkedBlock } from "../blocks";
import { LinkedChainIcon } from "../chains";
import { Card } from "../ui/card";
import { CopyItem } from "../ui/copy-item";
import { KeyValueTable } from "../ui/key-value-table";

import { shortenString } from "@/lib";

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
          Hash: <CopyItem item={transaction.hash}>{transaction.hash}</CopyItem>,
          "Block Number": <LinkedBlock chain={chain} block={block} />,
          Chain: <LinkedChainIcon chain={chain} />,
          From: <LinkedAddress chain={chain} address={transaction.from} />,
          To: <LinkedAddress chain={chain} address={transaction.to} />,
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
