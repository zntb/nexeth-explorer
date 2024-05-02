import { Address } from "@thirdweb-dev/sdk";
import { FC } from "react";

import { Card } from "../ui/card";
import { KeyValueTable } from "../ui/key-value-table";

export interface AddressDetailsTableProps {
  address: Address;
}

export const AddressDetailsTable: FC<AddressDetailsTableProps> = ({
  address,
}) => (
  <Card>
    <KeyValueTable
      data={{
        Address: address,
      }}
    />
  </Card>
);
