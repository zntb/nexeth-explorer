import { FC } from "react";

import { CommandKeys, CommandSearch } from "../command-palette/command-search";
import Typography from "../ui/typography";

export const Hero: FC = () => (
  <div className="flex flex-col items-center text-center gap-2 max-w-xl mx-auto mt-20">
    <Typography variant="h1" className="text-[80px]">
      Nexeth
    </Typography>

    <Typography variant="h3" className="font-light">
      Explore Ethereum at the{" "}
      <span className="font-bold">Speed of Thought</span>
    </Typography>
    <Typography effect="tiny">
      Nexeth unifies your search across Ethereum and L2s. Explore networks,
      tokens, NFTs, and transactions – all from a single powerful interface. Try
      entering an address, transaction hash, token name or ENS to get started.
      Open up the Command Menu at any time with <CommandKeys />
    </Typography>
    <div className="pt-4 w-full">
      <CommandSearch label="🔍 Search for a token, address, or transaction" />
    </div>
  </div>
);
