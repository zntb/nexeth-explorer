import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Chain } from "@thirdweb-dev/chains";

import { LinkedAddress } from "../address";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

import { LinkedTransaction } from "./linked-transaction";

import { LiteTransaction, matchingAddresses } from "@/server";

export interface TransactionsTableProps {
  address?: string;
  transactions: LiteTransaction[];
  chain: Chain;
  isLoading?: boolean;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  address,
  transactions,
  chain,
  isLoading,
}) => (
  <Card>
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-4">Hash</TableHead>
          <TableHead className="w-8">Method</TableHead>
          <TableHead className="w-2">Type</TableHead>
          <TableHead className="w-16">From</TableHead>
          {address && <TableHead className="w-8"></TableHead>}
          <TableHead className="w-16">To</TableHead>
          <TableHead className="w-4">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <LoadingRows />
        ) : transactions ? (
          transactions.map((transaction) => (
            <TableRow key={transaction.hash}>
              <TableCell>
                <LinkedTransaction
                  chain={chain}
                  hash={transaction.hash}
                  short
                />
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {transaction.type.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge>{transaction.token.toUpperCase()}</Badge>
              </TableCell>
              <TableCell>
                <LinkedAddress
                  chain={chain}
                  address={transaction.from}
                  short
                  highlight={matchingAddresses(address, transaction.from)}
                />
              </TableCell>
              {address && (
                <TableCell>
                  <ArrowRightIcon />
                </TableCell>
              )}
              <TableCell>
                <LinkedAddress
                  chain={chain}
                  address={transaction.to}
                  short
                  highlight={matchingAddresses(address, transaction.to)}
                />
              </TableCell>
              <TableCell>
                {transaction.value
                  ? `${transaction.value} ${chain.nativeCurrency.symbol}`
                  : "-"}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <EmptyRows />
        )}
      </TableBody>
    </Table>
  </Card>
);

const LoadingRows = () => (
  <>
    <TableRow>
      <TableCell colSpan={7}>
        <Skeleton className="w-full h-8" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={7}>
        <Skeleton className="w-full h-8" />
      </TableCell>
    </TableRow>{" "}
    <TableRow>
      <TableCell colSpan={7}>
        <Skeleton className="w-full h-8" />
      </TableCell>
    </TableRow>
  </>
);

const EmptyRows = () => (
  <TableRow>
    <TableCell colSpan={7}>No transactions found.</TableCell>
  </TableRow>
);
