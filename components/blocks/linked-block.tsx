import { Chain } from "@thirdweb-dev/chains";
import Link from "next/link";
import { FC } from "react";

import Typography from "../ui/typography";

import { createBlockLink } from "@/lib";

export interface LinkedBlockProps {
  chain: Chain;
  block?: number;
  short?: boolean;
}

export const LinkedBlock: FC<LinkedBlockProps> = ({ chain, block }) =>
  block ? (
    <Link href={createBlockLink({ chain, block })}>
      <Typography>{block}</Typography>
    </Link>
  ) : undefined;
