import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { ChainIcon } from "../chains";
import { Button } from "../ui/button";

import { supportedChainsAndTestnets, createAddressLink } from "@/lib";

export interface AddressChainScrollerProps {
  address: string;
}

export const AddressChainScroller = ({
  address,
}: AddressChainScrollerProps) => (
  <div className="flex gap-2 items-center">
    <ChevronLeftIcon className="mb-4 lg:hidden" />
    <div className="flex items-center gap-2 opacity-80 overflow-x-scroll pb-4">
      {supportedChainsAndTestnets.map((chain) => (
        <Link key={chain.slug} href={createAddressLink({ chain, address })}>
          <Button size="xs" variant="outline" className="flex gap-2">
            <ChainIcon chain={chain} size={10} /> {chain.name}
          </Button>
        </Link>
      ))}
    </div>
    <ChevronRightIcon className="mb-4 lg:hidden" />
  </div>
);
