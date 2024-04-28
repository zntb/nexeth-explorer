import { procedure, router } from "../router-procedures";
import {
  DashboardTag,
  getDashboardResponseSchema,
} from "../schema/dashboard.schema";

export const dashboardRouter = router({
  get: procedure.output(getDashboardResponseSchema).query(async () => ({
    dashboards: [
      {
        name: "L2 Beat",
        description:
          "Analytics and research website about Ethereum layer 2 scaling, comparing major protocols live on Ethereum today.",
        url: "https://l2beat.com/",
        image: "/dashboard-images/l2beat.png",
        tags: [DashboardTag.Layer2],
      },
      {
        name: "L2 Fees",
        description:
          "Ethereum Layer-1 is expensive. How much does it cost to use Layer-2?",
        url: "https://l2fees.info/",
        image: "/dashboard-images/l2fees.png",
        tags: [DashboardTag.Layer2],
      },
      {
        name: "AlphaDay",
        description:
          "Alphaday is the ultimate crypto dashboard for staying up to date with all things crypto and interacting with your favorite DApps",
        url: "https://app.alphaday.com/",
        image: "/dashboard-images/alpha-day.jpg",
        tags: [DashboardTag.General],
      },
      {
        name: "Rotki",
        description:
          "Rotki is an open source portfolio tracker, accounting and analytics tool that protects your privacy.",
        url: "https://rotki.com/",
        image: "/dashboard-images/rotki.jpg",
        tags: [DashboardTag.General],
      },
      {
        name: "Blocknative Mempool Explorer",
        description:
          "Realtime mempool monitoring to visualize, capture, and filter enriched pre-chain event data.",
        url: "https://explorer.blocknative.com",
        image: "/dashboard-images/blocknative-mempool-explorer.jpg",
        tags: [DashboardTag.General],
      },
      {
        name: "Ethereum Roadmap",
        description:
          "Everything you need to know about the Ethereum roadmap: The Merge, Surge, Scourge, Verge, Purge and Splurge.",
        url: "https://ethroadmap.com",
        image: "/dashboard-images/ethroadmap.jpg",
        tags: [DashboardTag.General],
      },
      {
        name: "Project Sunshine",
        description:
          "A dashboard to measure the health of Ethereum's decentralization.",
        url: "https://ethsunshine.com",
        image: "/dashboard-images/project-sunshine.jpg",
        tags: [DashboardTag.EcosystemHealth],
      },
      {
        name: "Node Watch",
        description:
          "General Information · Node count · Percentage of network synced · Percentage of network unsynced.",
        url: "https://nodewatch.io",
        image: "/dashboard-images/node-watch.jpg",
        tags: [DashboardTag.EcosystemHealth],
      },
      {
        name: "Gnosis d14n",
        description:
          "d14n.info is a real-time dashboard that measures decentralization of the Gnosis Chain and Ethereum networks.",
        url: "https://d14n.info",
        image: "/dashboard-images/gnosis.png",
        tags: [DashboardTag.EcosystemHealth],
      },
      {
        name: "Miga Labs Crawler",
        description:
          "The Armiarma Crawler Dashboard displays the observed client distribution in the Eth2 network in real-time.",
        url: "https://migalabs.es/crawler/dashboard",
        image: "/dashboard-images/miga-labs.jpg",
        tags: [DashboardTag.EcosystemHealth],
      },
      {
        name: "Ethereum Nodes Statistics",
        description:
          "Ethereum mainnet statistics & diversity by client, country, sync status, OS, and network type.",
        url: "https://ethernodes.org/",
        image: "/dashboard-images/ethernodes.jpg",
        tags: [DashboardTag.EcosystemHealth],
      },
      {
        name: "Execution Diversity",
        description:
          "About the supermajority client risk of the execution layer, especially the client usage of staking services and pools.",
        url: "https://execution-diversity.info/",
        image: "/dashboard-images/execution-diversity.png",
        tags: [DashboardTag.EcosystemHealth],
      },
      {
        name: "Client Diversity.org",
        description: "Consensus & Execution layer client distribution.",
        url: "https://clientdiversity.org",
        image: "/dashboard-images/client-diversity.jpg",
        tags: [DashboardTag.EcosystemHealth],
      },
      {
        name: "Rated.Network",
        description:
          "A measure of uptime — how available a validator or entity has been to provide network services.",
        url: "https://www.rated.network/?network=mainnet&view=nodeOperator",
        image: "/dashboard-images/rated-network.jpg",
        tags: [DashboardTag.Staking],
      },
      {
        name: "Ethereum Pools.info",
        description:
          "We aggragate and monitor Ethereum validators belonging to well known entities (exchanges, companies, pools, operators).",
        url: "https://ethereumpools.info/d/ox1NIwf7k/ethereumpools-public?orgId=1&kiosk&refresh=5m",
        image: "/dashboard-images/eth-pools.jpg",
        tags: [DashboardTag.Staking],
      },
      {
        name: "Beaconcha.in",
        description: "Open source Ethereum Beacon Chain explorer",
        url: "https://beaconcha.in",
        image: "/dashboard-images/beacon-chain.jpg",
        tags: [DashboardTag.Staking],
      },
      {
        name: "Rocket Pool Dashboard",
        description: "Rocket Pool Liquid Staking explorer.",
        url: "https://rocketscan.io",
        image: "/dashboard-images/rocket-scan.jpg",
        tags: [DashboardTag.Staking],
      },
      {
        name: "StakeBoard",
        description: "StakeBoard is a beginner-friendly staking dashboard",
        url: "https://app.stakepark.xyz",
        image: "/dashboard-images/stakeboard.jpg",
        tags: [DashboardTag.Staking],
      },
      {
        name: "Nansen Ethereum Shanghai (Shapella)",
        description:
          "This dashboard highlights all the key data points around the Shapella upgrade",
        url: "https://query.nansen.ai/public/dashboards/Hk93n66vsO0uvycfui8ypF2xcpNhpraxfwX5AWZJ",
        image: "/dashboard-images/nansen.png",
        tags: [DashboardTag.Staking],
      },
      {
        name: "Metrika Withdrawals",
        description:
          "Dashboard by Metrika to monitor the Ethereum withdrawal process",
        url: "https://app.metrika.co/ethereum/dashboard/withdrawals-overview?tr=1d",
        image: "/dashboard-images/metrika-withdrawals.png",
        tags: [DashboardTag.Staking],
      },
      {
        name: "Ethereum Shanghai Unlock",
        description:
          "Dashboard by Token Unlocks to monitor the Ethereum Shanghai ecosystem.",
        url: "https://token.unlocks.app/ethereum-shanghai",
        image: "/dashboard-images/token-unlocks.png",
        tags: [DashboardTag.Staking],
      },
      {
        name: "Hildobby's Staking",
        description:
          "This dashboard tracks ETH sent to the Consensus Layer deposit address & beacon chain outflow.",
        url: "https://dune.com/hildobby/eth2-staking",
        image: "/dashboard-images/hildobby-staking.png",
        tags: [DashboardTag.Staking, DashboardTag.DuneAnalytics],
      },
      {
        name: "UltraSound Money",
        description:
          "Ultra sound money is an Ethereum meme focusing on the likely decrease of the ETH supply.",
        url: "https://ultrasound.money/",
        image: "/dashboard-images/ultra-sound.jpg",
        tags: [DashboardTag.MonetaryPolicy],
      },
      {
        name: "Ratio Gang",
        description:
          "Ratio Gang assemble! Monitor the progress of Ethereum (ETH) in overtaking Bitcoin (BTC) by market cap.",
        url: "https://ratiogang.com/",
        image: "/dashboard-images/ratio-gang.jpg",
        tags: [DashboardTag.MonetaryPolicy],
      },
      {
        name: "Flippening Watch",
        description:
          "“The Flippening” refers to the possible future event when Ethereum overtakes Bitcoin to become the most valuable cryptocurrency in market cap.",
        url: "https://buybitcoinworldwide.com/flippening/",
        image: "/dashboard-images/flippening-watch.jpg",
        tags: [DashboardTag.MonetaryPolicy],
      },
      {
        name: "DeFi Llama",
        description:
          "DefiLlama is the largest TVL aggregator for DeFi (Decentralized Finance).",
        url: "https://defillama.com/",
        image: "/dashboard-images/defi-llama.jpg",
        tags: [DashboardTag.DeFi],
      },
      {
        name: "DeFi Toolkit",
        description:
          "Curated list of best tools and resources for user of Ethereum (DeFi) ecosystem.",
        url: "https://hackmd.io/@gweicz/defi-toolkit",
        image: "/dashboard-images/defi-toolkit.jpg",
        tags: [DashboardTag.DeFi],
      },
      {
        name: "Stablecoins.wtf",
        description:
          "We accumulate quantitative live-data of major stablecoins in a single dashboard. And we aim to make the data understandable by everyone.",
        url: "https://stablecoins.wtf",
        image: "/dashboard-images/stablecoins-wtf.jpg",
        tags: [DashboardTag.DeFi],
      },
      {
        name: "Flashbots",
        description:
          "The Flashbots MEV-Boost transparency dashboard is a public dashboard of metrics related to the Flashbots MEV-Boost relay and builder.",
        url: "https://transparency.flashbots.net",
        image: "/dashboard-images/flashbots.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "MEV Boost.org",
        description:
          "Tracking MEV-Boost relays and block builders. A quick hack by Anish. Design inspired by file.app.",
        url: "https://mevboost.org",
        image: "/dashboard-images/mev-boost.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "MEV Boost.pics",
        description:
          "MEV-Boost Dashboard. All charts have an interactive component: you can filter by a certain time frame or hide and show specific relays and builders.",
        url: "https://mevboost.pics",
        image: "/dashboard-images/mev-boost-pics.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "MEV Watch",
        description:
          "Some MEV-Boost relays are regulated under OFAC and will censor certain transactions. Use this tool to observe the effect it's having on Ethereum blocks.",
        url: "https://mevwatch.info",
        image: "/dashboard-images/mev-watch.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "EigenPhi",
        description:
          "EigenPhi is a full-scale DeFi in-depth data platform for everyday DeFi users, Crypto traders & arbitragers.",
        url: "https://eigenphi.io",
        image: "/dashboard-images/eigen-phi.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "Inclusion Watch",
        description: "Inclusion Watch details daily avg OFAC compliant blocks.",
        url: "https://www.inclusion.watch/",
        image: "/dashboard-images/inclusion-watch.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "MEV Relays - Uptime Monitor",
        description: "Monitor Ethereum MEV Relay uptime.",
        url: "https://mev-relays.beaconstate.info/",
        image: "/dashboard-images/mev-beaconstate.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "Chainsight Analytics",
        description:
          "This dashboard tracks mev-boost blocks with a known pattern in them, representing blocks created by block-builders",
        url: "https://dune.com/ChainsightAnalytics/mev-after-ethereum-merge",
        image: "/dashboard-images/chain-analytics.jpg",
        tags: [DashboardTag.MEV, DashboardTag.DuneAnalytics],
      },
      {
        name: "Tornado Warnings",
        description:
          "Beware, dangerous tornados sighted at the relays of Manifold and Bloxroute! ⚠️ Some carry innocent money and come completely uncensored!",
        url: "https://tornado-warning.info/",
        image: "/dashboard-images/tornado-warnings.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "Beaconchain Relays",
        description:
          "Validators can use Relays to outsource their Block Production to entities specialized in extracting extra revenue.",
        url: "https://beaconcha.in/relays",
        image: "/dashboard-images/beaconchain-relays.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "icy.tools",
        description:
          "Real-time market insights, more NFT alpha. Use powerful analytics tools to track NFTs across marketplaces and make informed trading decisions.",
        url: "https://icy.tools/",
        image: "/dashboard-images/icy-tools.jpg",
        tags: [DashboardTag.NFTs],
      },
      {
        name: "Metrika Relay Monitor",
        description:
          "Relay Monitoring by Metrika to ensure performance and bid validation",
        url: "https://app.metrika.co/dashboard/ethereum/relay-monitor/north-america-east?tr=1d",
        image: "/dashboard-images/metrika-mev.jpg",
        tags: [DashboardTag.MEV],
      },
      {
        name: "Blocknative 4337 UserOps Explorer",
        description:
          "Dashboard to explore pending, confirmed, and failed ERC-4337 UserOperations",
        url: "https://4337.blocknative.com",
        image: "/dashboard-images/blocknative-user-ops.jpg",
        tags: [DashboardTag.AccountAbstraction],
      },
      {
        name: "Jiffyscan",
        description: "User Op explorer for ERC-4337",
        url: "https://www.jiffyscan.xyz/",
        image: "/dashboard-images/jiffyscan.jpg",
        tags: [DashboardTag.AccountAbstraction],
      },
    ],
  })),
});
