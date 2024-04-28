import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import SuperJSON from "superjson";

import { AppLayout, PageContainer } from "@/components/layouts";
import { propsParser } from "@/lib";
import { toTitleCase } from "@/lib/utils/to-title-case";
import { getBlockRequestSchema } from "@/server";
import { appRouter } from "@/server/routers/router";

const BlockPage = ({
  chain,
  block,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppLayout>
    <PageContainer
      title={`Block #${block.number}`}
      breadcrumbs={[
        { name: toTitleCase(chain), href: `/chains/${chain}` },
        { name: block.number, href: "" },
      ]}
    >
      {JSON.stringify(block, null, 2)}
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

  const { block } = await router.transaction.getBlock.fetch({
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
      chain,
    }),
  };
};
