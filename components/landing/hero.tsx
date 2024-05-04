import { DashboardIcon, MoonIcon } from "@radix-ui/react-icons";
import {
  Arbitrum,
  Base,
  Ethereum,
  Optimism,
  Polygon,
  Sepolia,
} from "@thirdweb-dev/chains";
import { FC } from "react";
import { FaEthereum } from "react-icons/fa";

import { ChainIcon } from "../chains";
import { CommandOpenAction } from "../command-palette";
import { CommandKeys, CommandSearch } from "../command-palette/command-search";
import Typography from "../ui/typography";

import { shortenString } from "@/lib";

export const Hero: FC = () => (
  <div className="flex flex-col items-center text-center gap-2 max-w-xl mx-auto mt-20">
    <Typography variant="h1" className="text-[80px]">
      Nexeth
    </Typography>

    {/* <Typography variant="h3" className="font-light">
      Explore Ethereum at the{" "}
      <span className="font-bold">Speed of Thought</span>
    </Typography> */}
    <div className="flex flex-col md:flex-row items-center gap-1">
      <Typography variant="h3" className="font-light">
        Blockchain Explorer.
      </Typography>
      <Typography variant="h3" className="font-light">
        <span className="font-bold">⚡️ Supercharged ⚡️</span>
      </Typography>
    </div>

    <Typography effect="tiny">
      Nexeth unifies your search across Ethereum and L2s (including testnets).
      Explore networks, tokens, NFTs, and transactions – all from a single
      powerful interface. Try entering an address, transaction hash, token name
      or ENS to get started. Open up the Command Menu at any time with{" "}
      <CommandKeys />
    </Typography>
    <div className="py-4 flex flex-col items-center">
      <CommandSearch
        label="🔍 Search for an address or transaction"
        className="w-full px-2"
      />
    </div>

    <Typography effect="tiny">
      Click to try out one of these search commands:
    </Typography>

    <div className="flex-wrap flex justify-center gap-2 opacity-80">
      <CommandOpenAction
        search="Base"
        icon={<ChainIcon chain={Base} size={15} />}
        label="Base"
      />
      <CommandOpenAction
        search="Dashboards"
        icon={<DashboardIcon />}
        label="Dashboards"
      />
      <CommandOpenAction
        search="Ethereum"
        icon={<ChainIcon chain={Ethereum} size={15} />}
        label="Ethereum Mainnet"
      />
      <CommandOpenAction
        search="Arbitrum"
        icon={<ChainIcon chain={Arbitrum} size={15} />}
        label="Arbitrum One"
      />
      <CommandOpenAction
        search="0x0a6726573baacdac113a1454190b0a7e88e1ffded3fac660b35d69209daebbd8"
        icon={<ChainIcon chain={Sepolia} size={15} />}
        label={`Sepolia Tx: ${shortenString(
          "0x0a6726573baacdac113a1454190b0a7e88e1ffded3fac660b35d69209daebbd8"
        )}`}
      />
      <CommandOpenAction
        search="Dark Theme"
        icon={<MoonIcon />}
        label="Dark Theme"
      />
      <CommandOpenAction search="Chains" icon="🔗" label="Chains" />
      <CommandOpenAction
        search="vitalik.eth"
        icon={<FaEthereum />}
        label="vitalik.eth"
      />
      <CommandOpenAction
        search="0x13b7be01de58e2e4b4d8078f03609afdccc5c7f6dd56ef1adec7d70659dec179"
        icon={<ChainIcon chain={Optimism} size={15} />}
        label={`Optimism Tx: ${shortenString(
          "0x13b7be01de58e2e4b4d8078f03609afdccc5c7f6dd56ef1adec7d70659dec179"
        )}`}
      />
      <CommandOpenAction
        search="0x4200000000000000000000000000000000000006"
        icon={<FaEthereum />}
        label="WETH (Base/Optimism)"
      />
      <CommandOpenAction
        search="Light Theme"
        icon={<MoonIcon />}
        label="Light Theme"
      />
      <CommandOpenAction
        search="Polygon"
        icon={<ChainIcon chain={Polygon} size={15} />}
        label="Polygon"
      />
    </div>
  </div>
);
