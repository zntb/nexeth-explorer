import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import SuperJSON from "superjson";

import { BlockDetailsTable } from "@/components/blocks";
import { BlockTabs } from "@/components/blocks/block-tabs";
import { ExplorerButtonGroup } from "@/components/explorers";
import { AppLayout, PageContainer } from "@/components/layouts";
import { createChainLink, propsParser, slugToChain } from "@/lib";
import { toTitleCase } from "@/lib/utils/to-title-case";
import { getBlockRequestSchema } from "@/server";
import { appRouter } from "@/server/routers/router";

const BlockPage = ({
  block,
  transactions,
  chain,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppLayout>
    <PageContainer
      title={`#${block.number}`}
      breadcrumbs={[
        { name: toTitleCase(chain.name), href: createChainLink({ chain }) },
        { name: `Block #${block.number}`, href: "" },
      ]}
    >
      <ExplorerButtonGroup
        explorers={chain.explorers}
        type="block"
        location={block.number}
      />
      {/* <BlockTimeline
        selectedBlock={block}
        latestBlock={latestBlock}
        chain={chain}
      /> */}
      <BlockDetailsTable block={block} chain={chain} />
      <BlockTabs block={block} transactions={transactions} chain={chain} />
    </PageContainer>
  </AppLayout>
);

export default BlockPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { chain, blockNumber } = getBlockRequestSchema.parse(ctx.query);

  const router = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON,
  });

  const { block, transactions, latestBlock } =
    await router.transaction.getBlock.fetch({
      chain,
      blockNumber,
    });

  if (!block) {
    return {
      notFound: true,
    };
  }

  return {
    props: propsParser({
      block,
      latestBlock,
      transactions,
      chain: slugToChain(chain),
    }),
  };
};
