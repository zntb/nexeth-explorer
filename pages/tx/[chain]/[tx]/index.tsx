import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import SuperJSON from "superjson";

import { ExplorerButtonGroup } from "@/components/explorers";
import { AppLayout, PageContainer } from "@/components/layouts";
import { TransactionDetailsTable } from "@/components/transactions";
import {
  createChainLink,
  propsParser,
  shortenString,
  slugToChain,
} from "@/lib";
import { toTitleCase } from "@/lib/utils/to-title-case";
import { getTransactionRequestSchema } from "@/server";
import { appRouter } from "@/server/routers/router";

const TransactionPage = ({
  chain,
  transaction,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppLayout>
    <PageContainer
      title="Transaction"
      breadcrumbs={[
        { name: toTitleCase(chain.name), href: createChainLink({ chain }) },
        { name: shortenString(transaction.hash), href: "" },
      ]}
    >
      <ExplorerButtonGroup
        explorers={chain.explorers}
        type="tx"
        location={transaction.hash}
      />
      <TransactionDetailsTable transaction={transaction} chain={chain} />
    </PageContainer>
  </AppLayout>
);

export default TransactionPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { chain, tx } = getTransactionRequestSchema.parse(ctx.query);

  const router = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON,
  });

  const { transaction } = await router.transaction.getTransaction.fetch({
    chain,
    tx,
  });

  if (!transaction) {
    return {
      notFound: true,
    };
  }

  return {
    props: propsParser({
      transaction,
      chain: slugToChain(chain),
    }),
  };
};
