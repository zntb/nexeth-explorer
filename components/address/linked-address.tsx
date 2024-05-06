import { Chain } from "@thirdweb-dev/chains";
import Link from "next/link";
import { FC } from "react";

import Typography from "../ui/typography";

import { createAddressLink, shortenString } from "@/lib";

export interface LinkedAddressProps {
  chain: Chain;
  address?: string;
  short?: boolean;
  highlight?: boolean;
}

export const LinkedAddress: FC<LinkedAddressProps> = ({
  chain,
  address,
  short = false,
  highlight = false,
}) =>
  address ? (
    <Link href={createAddressLink({ chain, address })}>
      <Typography className={`${highlight && "font-bold"}`}>
        {short ? shortenString(address) : address}
      </Typography>
    </Link>
  ) : undefined;
