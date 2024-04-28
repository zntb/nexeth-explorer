import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import SuperJSON from "superjson";

import { AppLayout, PageContainer } from "@/components/layouts";
import { propsParser, shortenString } from "@/lib";
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
        { name: toTitleCase(chain), href: `/chains/${chain}` },
        { name: shortenString(transaction.hash), href: "" },
      ]}
    >
      {JSON.stringify(transaction, null, 2)}
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
      chain,
    }),
  };
};
