import { Chain } from "@thirdweb-dev/chains";
import { Address } from "@thirdweb-dev/sdk";
import { FC } from "react";

import { LinkedChainIcon } from "../chains";
import { useUsdPrice } from "../hooks";
import { Card } from "../ui/card";
import { CopyItem } from "../ui/copy-item";
import { KeyValueTable } from "../ui/key-value-table";
import { Skeleton } from "../ui/skeleton";

import { GetAddressDetailsResponse } from "@/server";

export interface ChainAddressDetailsTableProps {
  address: Address;
  chain?: Chain;
  details: GetAddressDetailsResponse;
}

export const ChainAddressDetailsTable: FC<ChainAddressDetailsTableProps> = ({
  address,
  chain,
  details,
}) => {
  const { data: usd, isLoading: isLoadingPrice } = useUsdPrice(details.balance);

  return (
    <Card>
      <KeyValueTable
        data={{
          Address: <CopyItem item={address}>{address}</CopyItem>,
          Type: details.isContract ? "Contract" : "Account",
          Chain: chain ? <LinkedChainIcon chain={chain} /> : "Unknown",
          "Balance (ETH)": `${details.balance} ETH`,
          "Balance (USD)": isLoadingPrice ? (
            <Skeleton className="w-20 h-4" />
          ) : (
            `$${usd} USD`
          ),
        }}
      />
    </Card>
  );
};
