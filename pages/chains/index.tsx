import { createServerSideHelpers } from "@trpc/react-query/server";
import { InferGetStaticPropsType } from "next";
import SuperJSON from "superjson";

import { ChainSearch } from "@/components/chains/chain-search";
import { AppLayout, PageContainer } from "@/components/layouts";
import { appRouter } from "@/server/routers/router";

const ChainsPage = ({
  chains,
  testnets,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <AppLayout>
    <PageContainer
      title="Chains"
      description="Your journey through the world of Ethereum chains starts here. Compare transaction speeds, fees, and features. Find the best chain for your DeFi adventures, NFT purchases, and more."
      breadcrumbs={[{ name: "Chains", href: "/chains" }]}
    >
      <ChainSearch chains={chains} testnets={testnets} />
    </PageContainer>
  </AppLayout>
);

export default ChainsPage;

export const getStaticProps = async () => {
  const router = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON,
  });

  const props = await router.chains.getChains.fetch();

  return {
    props,
  };
};
