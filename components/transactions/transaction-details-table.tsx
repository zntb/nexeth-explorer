import { Transaction } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { FC } from "react";

import { Card } from "../ui/card";
import { KeyValueTable } from "../ui/key-value-table";

export interface TransactionDetailsTableProps {
  transaction: Transaction;
}

export const TransactionDetailsTable: FC<TransactionDetailsTableProps> = ({
  transaction,
}) => (
  <Card>
    <KeyValueTable
      data={{
        Hash: transaction.hash,
        From: transaction.from,
        To: transaction.to,
        Data: transaction.data,
        Value: formatEther(transaction.value),
        Gas: formatEther(transaction.gasLimit),
        GasPrice: formatEther(transaction.gasPrice ?? 0),
        Nonce: transaction.nonce,
      }}
    />
  </Card>
);
