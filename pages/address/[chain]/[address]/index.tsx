import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { ChainAddressDetailsTable } from "@/components/address";
import { AppLayout, PageContainer } from "@/components/layouts";
import { isChainContract, propsParser, shortenString } from "@/lib";
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
      breadcrumbs={
        chain === "all"
          ? [{ name: shortenString(address), href: "" }]
          : [
              { name: toTitleCase(chain), href: `/chains/${chain}` },
              { name: shortenString(address), href: "" },
            ]
      }
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
      chain,
      isContract,
    }),
  };
};
