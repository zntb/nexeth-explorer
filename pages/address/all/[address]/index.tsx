import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { AddressDetailsTable } from "@/components/address";
import { AppLayout, PageContainer } from "@/components/layouts";
import { propsParser, shortenString } from "@/lib";
import { getAddressRequestSchema } from "@/server";

const WalletAddressPage = ({
  address,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppLayout>
    <PageContainer
      title={shortenString(address)}
      breadcrumbs={[{ name: shortenString(address), href: "" }]}
    >
      This is a wallet address.
      <AddressDetailsTable address={address} />
    </PageContainer>
  </AppLayout>
);

export default WalletAddressPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { address } = getAddressRequestSchema.parse(ctx.query);

  return {
    props: propsParser({
      address,
    }),
  };
};
