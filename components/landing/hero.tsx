import { FC } from "react";

import { CommandSearch } from "../command-palette/command-search";
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
      Nexeth allows you to explore all things Ethereum and L2s in one powerful
      search. Try entering an address, transaction hash, token name or ENS to
      get started.
    </Typography>
    <div className="pt-4 w-full">
      <CommandSearch label="🔍 Search for a token, address, or transaction" />
    </div>
  </div>
);
