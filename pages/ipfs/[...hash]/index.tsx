import { Ethereum } from "@thirdweb-dev/chains";
import { useResolvedMediaType } from "@thirdweb-dev/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { AppLayout, PageContainer } from "@/components/layouts";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { isIpfsSearch, propsParser, shortenString } from "@/lib";
import { serverThirdWebSDK } from "@/lib/services/thirdweb-sdk.service";

const IpfsPage = ({
  hash,
  scheme,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { url, mimeType } = useResolvedMediaType(hash);

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
              "Media Type": mimeType,
              "IPFS URL": url,
            }}
          />
        </Card>

        <Card className="overflow-hidden">
          <AspectRatio ratio={1}>
            <iframe className="w-full h-full" src={scheme} />
          </AspectRatio>
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
  const scheme = storage.resolveScheme(`ipfs://${hash}`);

  if (!isValid) {
    return {
      notFound: true,
    };
  }

  console.log({ hash, scheme });

  return {
    props: propsParser({
      hash,
      scheme,
    }),
  };
};
