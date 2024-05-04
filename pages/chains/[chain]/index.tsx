import { Chain } from "@thirdweb-dev/chains";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { minutesToSeconds } from "date-fns";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { z } from "zod";

import { ChainHeader, ChainStatsCard } from "@/components/chains";
import { AppLayout, PageContainer } from "@/components/layouts";
import { createChainLink, slugToChain } from "@/lib";
import { appRouter } from "@/server/routers/router";

const ChainPage = ({
  chain,
  stats,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <AppLayout>
    <PageContainer
      title={chain.name}
      breadcrumbs={[
        { name: "Chains", href: "/chains" },
        { name: chain.name, href: createChainLink({ chain }) },
      ]}
    >
      <ChainHeader chain={chain} />

      <ChainStatsCard stats={stats} />
    </PageContainer>
  </AppLayout>
);

export default ChainPage;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { chain: slug } = z.object({ chain: z.string() }).parse(ctx.params);

  const chain = slugToChain(slug) as Chain;

  const router = createServerSideHelpers({
    router: appRouter,
    ctx: {},
  });

  const { stats } = await router.chains.getChainStats.fetch({ chain: slug });

  return {
    props: {
      chain,
      stats,
    },
    revalidate: minutesToSeconds(10),
  };
};

export const getStaticPaths = async () => {
  const router = createServerSideHelpers({
    router: appRouter,
    ctx: {},
  });

  const { chains, testnets } = await router.chains.getChains.fetch();

  return {
    paths: chains.concat(testnets).map((chain) => ({
      params: { chain: chain.slug },
    })),
    fallback: false,
  };
};
