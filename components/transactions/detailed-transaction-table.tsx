import { Chain } from "@thirdweb-dev/chains";
import { Transaction } from "ethers";
import Link from "next/link";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

import { createTransactionLink } from "@/lib";

export interface DetailedTransactionTableProps {
  transactions: Transaction[];
  chain: Chain;
}

export const DetailedTransactionTable: React.FC<
  DetailedTransactionTableProps
> = ({ transactions, chain }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Hash</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions.map((transaction) => (
        <TableRow key={transaction.hash}>
          <Link
            href={createTransactionLink({ hash: transaction.hash!, chain })}
          >
            <TableCell>{transaction.hash}</TableCell>
          </Link>
          <TableCell></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
