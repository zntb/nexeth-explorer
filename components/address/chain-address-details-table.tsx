import { Chain } from "@thirdweb-dev/chains";
import { Address } from "@thirdweb-dev/sdk";
import { FC } from "react";

import { Card } from "../ui/card";
import { KeyValueTable } from "../ui/key-value-table";

export interface ChainAddressDetailsTableProps {
  address: Address;
  chain?: Chain;
}

export const ChainAddressDetailsTable: FC<ChainAddressDetailsTableProps> = ({
  address,
  chain,
}) => (
  <Card>
    <KeyValueTable
      data={{
        Address: address,
        Chain: chain && chain !== "all" ? chain.name : "Unknown",
      }}
    />
  </Card>
);
