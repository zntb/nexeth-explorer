import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import SuperJSON from "superjson";

import { BlockDetailsTable } from "@/components/blocks";
import { BlockTimeline } from "@/components/blocks/block-timeline";
import { AppLayout, PageContainer } from "@/components/layouts";
import { Separator } from "@/components/ui/separator";
import { createChainLink, propsParser, slugToChain } from "@/lib";
import { toTitleCase } from "@/lib/utils/to-title-case";
import { getBlockRequestSchema } from "@/server";
import { appRouter } from "@/server/routers/router";

const BlockPage = ({
  chain,
  block,
  latestBlock,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppLayout>
    <PageContainer
      title={`#${block.number}`}
      breadcrumbs={[
        { name: toTitleCase(chain.name), href: createChainLink({ chain }) },
        { name: `Block #${block.number}`, href: "" },
      ]}
    >
      <BlockTimeline
        selectedBlock={block}
        latestBlock={latestBlock}
        chain={chain}
      />
      <BlockDetailsTable block={block} chain={chain} />
      <Separator />
      {/* <BlockTabs block={block} chain={chain} /> */}
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

  const { block, latestBlock } = await router.transaction.getBlock.fetch({
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
      chain: slugToChain(chain),
    }),
  };
};