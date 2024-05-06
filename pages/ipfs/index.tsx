import { hoursToSeconds } from "date-fns";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { SiIpfs } from "react-icons/si";

import { CommandOpenAction, CommandSearch } from "@/components/command-palette";
import { AppLayout, PageContainer } from "@/components/layouts";
import { StatsCard } from "@/components/stats/stats-card";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { propsParser } from "@/lib";
import { IpfsStatsService } from "@/lib/services/ipfs-stats.service";

const IpfsPage = ({
  serverCount,
  clientCount,
  serverIpCount,
  statsDate,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <AppLayout>
    <PageContainer
      title="IPFS"
      description="InterPlanetary File System (IPFS) is a protocol and network designed to create a content-addressable, peer-to-peer method of storing and sharing media in a distributed file system."
      breadcrumbs={[{ name: "IPFS", href: "/ipfs" }]}
    >
      <div className="flex flex-col gap-2 items-center max-w-lg mx-auto">
        <CommandSearch
          label="🔍 Enter an IPFS hash to view the content"
          className="w-full px-2"
        />
        <Typography effect="tiny">or click one of these to try</Typography>
        <div className="flex-wrap flex justify-center gap-2 opacity-80">
          <CommandOpenAction
            search="ipfs://QmP1jrs58rvbfBkRAu4Q5HLck3vkDX5F1zujz1srhh9hDw/nexeth-logo-transparent.png"
            icon={<SiIpfs />}
            label="Nexeth Logo in IPFS"
          />
          <CommandOpenAction
            search="Qmcd7D6TnnzZzsk12DBwCMRYx1a8TVX4tq4eemYqspL4Rv"
            icon={<SiIpfs />}
            label="A video in IPFS"
          />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <StatsCard
          title="DHT Servers"
          value={serverCount.toLocaleString()}
          subtitle="The estimated number of DHT servers."
        />
        <StatsCard
          title="DHT Clients"
          value={clientCount.toLocaleString()}
          subtitle="The estimated number of DHT clients."
        />
        <StatsCard
          title="IPFS Server IP Count"
          value={serverIpCount.toLocaleString()}
          subtitle="The number of IPFS server IP addresses."
        />
      </div>
      <Typography effect="tiny" className="text-right">
        Stats as of {new Date(statsDate).toDateString()} provided by{" "}
        <Link
          href="https://probelab.io/ipfs/kpi/"
          target="_blank"
          className="underline"
        >
          Probelab
        </Link>
        .
      </Typography>
    </PageContainer>
  </AppLayout>
);

export default IpfsPage;

export const getStaticProps = async () => {
  const statsService = new IpfsStatsService();
  const stats = await statsService.getClientServerStats();

  const serverCount = stats.data[0].y[stats.data[0].y.length - 1];
  const clientCount = stats.data[1].y[stats.data[1].y.length - 1];
  const serverIpCount = stats.data[2].y[stats.data[2].y.length - 1];
  const statsDate = stats.data[0].x[stats.data[0].x.length - 1];

  return {
    props: propsParser({
      serverCount,
      clientCount,
      serverIpCount,
      statsDate,
    }),
    revalidate: hoursToSeconds(24),
  };
};
