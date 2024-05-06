import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Chain } from "@thirdweb-dev/chains";

import { LinkedAddress } from "../address";
import { LinkedBlock } from "../blocks";
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
  hide?: Record<string, boolean>;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  address,
  transactions,
  chain,
  isLoading,
  hide = {},
}) => (
  <Card>
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {!hide.block && <TableHead className="">Block</TableHead>}
          {!hide.hash && <TableHead className="">Hash</TableHead>}
          {!hide.type && <TableHead className="">Method</TableHead>}
          {!hide.token && <TableHead className="">Type</TableHead>}
          {!hide.from && <TableHead className="">From</TableHead>}
          {!hide.arrow && <TableHead className=""></TableHead>}
          {!hide.to && <TableHead className="">To</TableHead>}
          {!hide.value && <TableHead className="">Value</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <LoadingRows />
        ) : transactions ? (
          transactions.map((transaction) => (
            <TableRow key={transaction.hash}>
              {!hide.block && (
                <TableCell>
                  <LinkedBlock chain={chain} block={transaction.blockNumber} />
                </TableCell>
              )}
              {!hide.hash && (
                <TableCell>
                  <LinkedTransaction
                    chain={chain}
                    hash={transaction.hash}
                    short
                  />
                </TableCell>
              )}
              {!hide.type && (
                <TableCell>
                  <Badge variant="secondary">
                    {transaction.type?.toUpperCase()}
                  </Badge>
                </TableCell>
              )}
              {!hide.token && (
                <TableCell>
                  <Badge>{transaction.token?.toUpperCase()}</Badge>
                </TableCell>
              )}
              {!hide.from && (
                <TableCell>
                  <LinkedAddress
                    chain={chain}
                    address={transaction.from}
                    short
                    highlight={matchingAddresses(address, transaction.from)}
                  />
                </TableCell>
              )}
              {!hide.arrow && (
                <TableCell>
                  <ArrowRightIcon />
                </TableCell>
              )}
              {!hide.to && (
                <TableCell>
                  <LinkedAddress
                    chain={chain}
                    address={transaction.to}
                    short
                    highlight={matchingAddresses(address, transaction.to)}
                  />
                </TableCell>
              )}
              {!hide.value && (
                <TableCell>
                  {transaction.value
                    ? `${transaction.value} ${chain.nativeCurrency.symbol}`
                    : "-"}
                </TableCell>
              )}
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
      <TableCell colSpan={8}>
        <Skeleton className="w-full h-8" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={8}>
        <Skeleton className="w-full h-8" />
      </TableCell>
    </TableRow>{" "}
    <TableRow>
      <TableCell colSpan={8}>
        <Skeleton className="w-full h-8" />
      </TableCell>
    </TableRow>
  </>
);

const EmptyRows = () => (
  <TableRow>
    <TableCell colSpan={8}>No transactions found.</TableCell>
  </TableRow>
);
