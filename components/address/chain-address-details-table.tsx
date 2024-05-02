import { Address } from "@thirdweb-dev/sdk";
import { FC } from "react";

import { Card } from "../ui/card";
import { KeyValueTable } from "../ui/key-value-table";

import { slugToChain } from "@/lib";

export interface ChainAddressDetailsTableProps {
  address: Address;
  chain?: string;
}

export const ChainAddressDetailsTable: FC<ChainAddressDetailsTableProps> = ({
  address,
  chain,
}) => (
  <Card>
    <KeyValueTable
      data={{
        Address: address,
        Chain: chain && chain !== "all" ? slugToChain[chain].name : "Unknown",
      }}
    />
  </Card>
);
