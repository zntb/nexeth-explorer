import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";

import { AddressDetailsTable } from "@/components/address";
import { ChainIcon } from "@/components/chains";
import { AppLayout, PageContainer } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import {
  createAddressLink,
  propsParser,
  shortenString,
  supportedChainsAndTestnets,
} from "@/lib";
import { getAddressRequestSchema } from "@/server";

const WalletAddressPage = ({
  address,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppLayout>
    <PageContainer
      title={shortenString(address, 8, 8)}
      breadcrumbs={[{ name: shortenString(address), href: "" }]}
    >
      <AddressDetailsTable address={address} />
      <div className="flex flex-col gap-4 max-w-lg mx-auto text-center">
        <Typography effect="tiny">
          This is a valid Ethereum address. View more details by selecting a
          chain.
        </Typography>

        <div className="flex-wrap flex justify-center gap-2 opacity-80">
          {supportedChainsAndTestnets.map((chain) => (
            <Link key={chain.slug} href={createAddressLink({ chain, address })}>
              <Button size="sm" variant="outline" className="flex gap-2">
                <ChainIcon chain={chain} size={10} /> {chain.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
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
