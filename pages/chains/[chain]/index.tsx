import { Chain } from "@thirdweb-dev/chains";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { z } from "zod";

import { ChainCard } from "@/components/chains/chain-card";
import { AppLayout, PageContainer } from "@/components/layouts";
import { createChainLink, slugToChain } from "@/lib";
import { appRouter } from "@/server/routers/router";

const ChainPage = ({
  chain,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <AppLayout>
    <PageContainer
      title={chain.name}
      breadcrumbs={[
        { name: "Chains", href: "/chains" },
        { name: chain.name, href: createChainLink({ chain }) },
      ]}
    >
      <ChainCard chain={chain} />
    </PageContainer>
  </AppLayout>
);

export default ChainPage;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { chain: slug } = z.object({ chain: z.string() }).parse(ctx.params);

  const chain = slugToChain(slug) as Chain;

  return {
    props: {
      chain,
    },
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
