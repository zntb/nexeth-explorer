import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import SuperJSON from "superjson";

import { ChainAddressDetailsTable } from "@/components/address";
import { AddressChainScroller } from "@/components/address/address-chain-scroller";
import { ExplorerButtonGroup } from "@/components/explorers";
import { AppLayout, PageContainer } from "@/components/layouts";
import { TransactionsTable } from "@/components/transactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createChainLink,
  propsParser,
  shortenString,
  slugToChain,
} from "@/lib";
import { toTitleCase } from "@/lib/utils/to-title-case";
import { getChainAddressRequestSchema, trpc } from "@/server";
import { appRouter } from "@/server/routers/router";

const ChainAddressPage = ({
  chain,
  address,
  details,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading } = trpc.transaction.getTransfers.useQuery(
    { address, chain: chain.slug },
    { keepPreviousData: false }
  );

  return (
    <AppLayout>
      <PageContainer
        title={`${details.isContract ? "Contract" : "Address"} ${shortenString(
          address
        )}`}
        breadcrumbs={[
          { name: toTitleCase(chain.name), href: createChainLink({ chain }) },
          { name: shortenString(address), href: "" },
        ]}
      >
        <ExplorerButtonGroup
          explorers={chain.explorers}
          type="address"
          location={address}
        />

        <ChainAddressDetailsTable
          address={address}
          chain={chain}
          details={details}
        />

        <AddressChainScroller address={address} />

        <Tabs defaultValue="transfers" className="mt-[-16px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
          </TabsList>
          <TabsContent value="transfers">
            <TransactionsTable
              transactions={data?.transactions || []}
              chain={chain}
              address={address}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </PageContainer>
    </AppLayout>
  );
};

export default ChainAddressPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { chain, address } = getChainAddressRequestSchema.parse(ctx.query);

  const router = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON,
  });

  const [details] = await Promise.all([
    router.address.getDetails.fetch({ chain, address }),
  ]);

  return {
    props: propsParser({
      address,
      chain: slugToChain(chain),
      details,
    }),
  };
};
