import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { ChainAddressDetailsTable } from "@/components/address";
import { AppLayout, PageContainer } from "@/components/layouts";
import {
  createChainLink,
  isChainContract,
  propsParser,
  shortenString,
  slugToChain,
} from "@/lib";
import { toTitleCase } from "@/lib/utils/to-title-case";
import { getChainAddressRequestSchema } from "@/server";

const ChainAddressPage = ({
  chain,
  address,
  isContract,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppLayout>
    <PageContainer
      title={shortenString(address)}
      breadcrumbs={[
        { name: toTitleCase(chain.name), href: createChainLink({ chain }) },
        { name: shortenString(address), href: "" },
      ]}
    >
      {isContract ? "This is a contract address." : "This is a wallet address."}
      <ChainAddressDetailsTable address={address} chain={chain} />
    </PageContainer>
  </AppLayout>
);

export default ChainAddressPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { chain, address } = getChainAddressRequestSchema.parse(ctx.query);

  const isContract = await isChainContract(address, chain);

  return {
    props: propsParser({
      address,
      chain: slugToChain(chain),
      isContract,
    }),
  };
};
