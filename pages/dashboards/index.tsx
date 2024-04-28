import { createServerSideHelpers } from "@trpc/react-query/server";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import SuperJSON from "superjson";

import { DashboardSearch } from "@/components/dashboards/dashboard-search";
import { AppLayout, PageContainer } from "@/components/layouts";
import { appRouter } from "@/server/routers/router";

const DashboardsPage = ({
  dashboards,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <AppLayout>
    <PageContainer
      title="Dashboards"
      description={
        <>
          All of your favourite Ethereum Dashboards in one place. Originally{" "}
          <Link
            className="underline text-blue-500"
            href="https://www.ethdash.xyz/"
            target="_blank"
          >
            ethdash.xyz
          </Link>
          {". "}
          Thanks to{" "}
          <Link
            className="underline text-blue-500"
            href="https://github.com/superphiz/dashboards"
            target="_blank"
          >
            Superphiz
          </Link>{" "}
          for getting this started!
        </>
      }
      breadcrumbs={[{ name: "Dashboards", href: "/dashboards" }]}
    >
      <DashboardSearch dashboards={dashboards} />
    </PageContainer>
  </AppLayout>
);

export default DashboardsPage;

export const getStaticProps = async () => {
  const router = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON,
  });

  const { dashboards } = await router.dashboard.get.fetch();

  return {
    props: {
      dashboards,
    },
  };
};
