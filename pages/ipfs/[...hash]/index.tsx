import { Ethereum } from "@thirdweb-dev/chains";
import { useResolvedMediaType } from "@thirdweb-dev/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";

import { AppLayout, PageContainer } from "@/components/layouts";
import { Card } from "@/components/ui/card";
import { KeyValueTable } from "@/components/ui/key-value-table";
import {
  getIpfsCidVersion,
  isIpfsSearch,
  propsParser,
  shortenString,
} from "@/lib";
import { serverThirdWebSDK } from "@/lib/services/thirdweb-sdk.service";

const IpfsPage = ({
  ipfsUrl,
  hash,
  scheme,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { mimeType } = useResolvedMediaType(ipfsUrl);

  return (
    <AppLayout>
      <PageContainer
        title="IPFS Hash"
        breadcrumbs={[{ name: shortenString(hash), href: `/ipfs/${hash}` }]}
      >
        <Card>
          <KeyValueTable
            data={{
              Hash: hash,
              "CID Version": getIpfsCidVersion(hash),
              "Media Type": mimeType,
              "Gateway URL": (
                <Link href={scheme} target="_blank">
                  {scheme}
                </Link>
              ),
            }}
          />
        </Card>

        <Card className="overflow-hidden min-h-[300px]">
          <iframe className="w-full h-full min-h-[600px]" src={scheme} />
        </Card>
      </PageContainer>
    </AppLayout>
  );
};

export default IpfsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const hash = ctx.resolvedUrl.replace("/ipfs/", "");
  const { storage } = serverThirdWebSDK(Ethereum);
  const isValid = isIpfsSearch(hash);
  const ipfsUrl = `ipfs://${hash}`;
  const scheme = storage.resolveScheme(ipfsUrl);

  if (!isValid) {
    return {
      notFound: true,
    };
  }

  console.log({ hash, scheme });

  return {
    props: propsParser({
      ipfsUrl,
      hash,
      scheme,
    }),
  };
};
