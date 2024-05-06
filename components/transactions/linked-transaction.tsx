import { Chain } from "@thirdweb-dev/chains";
import Link from "next/link";
import { FC } from "react";

import { createTransactionLink, shortenString } from "@/lib";

export interface LinkedTransactionProps {
  chain: Chain;
  hash?: string;
  short?: boolean;
}

export const LinkedTransaction: FC<LinkedTransactionProps> = ({
  chain,
  hash,
  short = false,
}) =>
  hash ? (
    <Link href={createTransactionLink({ chain, hash })}>
      {short ? shortenString(hash, 12, 12) : hash}
    </Link>
  ) : undefined;
